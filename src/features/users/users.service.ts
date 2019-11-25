import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../core/entities/user.entity';
import { IUsersService } from '../../core/iservices/users.iservice';
import { LoginUserDto } from '../../features/auth/dto/login.dto';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async getAllUsers(
    user: User,
  ): Promise<User[]> {
    return this.usersRepository.getUsers(user);
  }

  async getUserById(
    id: number,
  ): Promise<User> {
    const found = await this.usersRepository.findOne({ where: { id }});

    if (!found) {
      throw new NotFoundException('User was not found.');
    }

    return found;
  }

  async getOneUser(options: object): Promise<User> {
    return await this.usersRepository.findOne(options);
}

  async createUser(
    registerTaskDto: RegisterUserDto,
  ): Promise<string> {
    return this.usersRepository.signUp(registerTaskDto);
  }

  async updateUserEmail(
    loginUserDto: LoginUserDto,
    user: User,
  ): Promise<User> {
    const found = await this.getUserById(user.id);
    found.email = loginUserDto.email;
    await found.save();

    return user;
  }

  async deleteUser(
    id: number,
  ): Promise<string> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User was not found.');
    } else {
      return 'The user has been deleted';
    }
  }
}
