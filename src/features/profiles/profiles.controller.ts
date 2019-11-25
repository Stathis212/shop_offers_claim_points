import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { Profile } from '../../core/entities/profile.entity';
import { User } from '../../core/entities/user.entity';
import { ProfilesService } from './profiles.service';

@ApiUseTags('profiles')
@ApiBearerAuth()
@Controller('api/profiles')
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
