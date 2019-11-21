import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Profile } from './profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  private logger = new Logger('ProfilesController');

  constructor(private profilesService: ProfilesService) {}

  @Get()
  public getProfile(
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(`User "${user.email}" retrieving profile.`);
    return this.profilesService.getProfile(user);
  }

}
