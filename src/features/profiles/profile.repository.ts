import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { Profile } from '../../core/entities/profile.entity';
import { User } from '../../core/entities/user.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  private logger = new Logger('ProfileRepository');

  async getProfile(
    user: User,
  ): Promise<Profile> {
    const query = this.createQueryBuilder('profile');

    query.where('profile.userId = :userId', { userId: user.id });

    try {
      const profile = await query.getOne();
      return profile;
    } catch (error) {
      this.logger.error(`Failed to get profile for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
