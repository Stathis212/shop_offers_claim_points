import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { CitiesService } from './cities.service';
import { City } from './city.entity';

@ApiUseTags('cities')
@ApiBearerAuth()
@Controller('api/cities')
@UseGuards(AuthGuard())
export class CitiesController {
  private logger = new Logger('CitiesController');

  constructor(private citiesService: CitiesService) {}

  @Get()
  public getCities(
    @GetUser() user: User,
  ): Promise<City[]> {
    this.logger.verbose(`User "${user.email}" retrieving all cities.`);
    return this.citiesService.getCities(user);
  }

}
