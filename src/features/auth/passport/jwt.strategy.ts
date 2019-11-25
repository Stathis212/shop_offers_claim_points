import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';
import { User } from '../../../core/entities/user.entity';
import { UserRepository } from '../../users/user.repository';

import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { user } = payload;
    const foundUser = await this.userRepository.findOne({ email: user.email });

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
