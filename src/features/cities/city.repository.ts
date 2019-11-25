import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { City } from '../../core/entities/city.entity';
import { User } from '../../core/entities/user.entity';

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
      this.logger.error(`Failed to get cities for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
