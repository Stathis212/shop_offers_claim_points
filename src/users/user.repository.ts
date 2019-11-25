import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { AuthRegistrationDto } from '../auth/dto/auth-registration.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async signUp(authRegistration: AuthRegistrationDto): Promise<void> {
    const { email, password, roles } = authRegistration;

    const user = new User();
    user.email = email;
    user.roles = roles;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

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
