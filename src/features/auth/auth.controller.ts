import { Body, Controller, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AllExceptionsFilter } from '../../core/filters/all-exception.filter';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@ApiUseTags('auth')
@Controller('api/auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<string> {
    return this.authService.signUp(registerUserDto);
  }

  @Post('/login')
  signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

}
