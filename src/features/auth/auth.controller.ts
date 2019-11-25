import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@ApiUseTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.signUp(registerUserDto);
  }

  @Post('/login')
  signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

}
