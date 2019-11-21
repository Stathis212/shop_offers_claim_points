import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CitiesService } from './cities.service';
import { City } from './city.entity';

@Controller('cities')
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
