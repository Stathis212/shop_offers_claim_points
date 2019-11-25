import {
  Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, UseGuards, ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { User } from '../../core/entities/user.entity';
import { RolesGuard } from '../../core/guards/roles.guard';
import { LoginUserDto } from '../../features/auth/dto/login.dto';
import { UsersService } from './users.service';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('api/users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  public getUsers(
    @GetUser() user: User,
  ): Promise<User[]> {
    this.logger.verbose(`User "${user.email}" retrieving all users.`);
    return this.usersService.getAllUsers(user);
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
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUserEmail(loginUserDto, user);
  }

  @Delete(':id')
  public deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.usersService.deleteUser(id);
  }

}
