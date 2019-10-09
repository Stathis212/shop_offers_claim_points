import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { City } from './city.entity';
import { CityRepository } from './city.repository';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityRepository)
    private citiesRepository: CityRepository,
  ) {}

  async getCities(
    user: User,
  ): Promise<City[]> {
    return this.citiesRepository.getCities(user);
  }
}
