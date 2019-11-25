import {
  Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, UseGuards, ValidationPipe,
} from '@nestjs/common';

import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from './user.entity';
import { UserRole } from './user.enum';
import { UsersService } from './users.service';

import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  public getUsers(
    @GetUser() user: User,
  ): Promise<User[]> {
    this.logger.verbose(`User "${user.email}" retrieving all users.`);
    return this.usersService.getUsers(user);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  public getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch('update/email')
  public updateUserEmail(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUserEmail(authCredentialsDto, user);
  }

  @Delete(':id')
  public deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.usersService.deleteUser(id);
  }

}
