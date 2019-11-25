import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityStatus } from '../../common/enums/entity-status.enum';
import { UserRepository } from '../users/user.repository';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  // private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(registerUserDto: RegisterUserDto): Promise<string> {
    return this.userRepository.signUp(registerUserDto);
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(loginUserDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.status === EntityStatus.INACTIVE) {
      throw new BadRequestException('Your account has not been activated.');
    }

    const payload: JwtPayload = { user };
    const accessToken = await this.jwtService.sign(payload);
    // this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
}
