import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { City } from '../../core/entities/city.entity';
import { User } from '../../core/entities/user.entity';
import { CitiesService } from './cities.service';

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
