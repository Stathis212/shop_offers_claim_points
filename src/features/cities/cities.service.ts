import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { City } from '../../core/entities/city.entity';
import { User } from '../../core/entities/user.entity';
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
