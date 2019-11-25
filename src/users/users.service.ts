import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async getUsers(
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

  async updateUserEmail(
    authCredentialsDto: AuthCredentialsDto,
    user: User,
  ): Promise<User> {
    const found = await this.getUserById(user.id);
    found.email = authCredentialsDto.email;
    await found.save();

    return user;
  }

  async deleteUser(
    id: number,
  ): Promise<void> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User was not found.');
    }
  }
}
