import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Profile } from '../../core/entities/profile.entity';
import { User } from '../../core/entities/user.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async getProfile(
    user: User,
  ): Promise<Profile> {
    return this.profileRepository.getProfile(user);
  }
}
