import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { LoginUserDto } from '../auth/dto/login.dto';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async signUp(authRegistration: RegisterUserDto): Promise<string> {
    const { email, password, roles } = authRegistration;

    const user = new User();
    user.email = email;
    user.roles = roles;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user.email;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUsers(
    user: User,
  ): Promise<User[]> {
    const query = this.createQueryBuilder('users');

    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      this.logger.error(`Failed to get users for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
