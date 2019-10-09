import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { City } from './city.entity';

@EntityRepository(City)
export class CityRepository extends Repository<City> {
  private logger = new Logger('CityRepository');

  async getCities(
    user: User,
  ): Promise<City[]> {
    const query = this.createQueryBuilder('cities');

    try {
      const cities = await query.getMany();
      return cities;
    } catch (error) {
      this.logger.error(`Failed to get cities for user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
