import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Shop } from './shop.entity';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  private logger = new Logger('ShopRepository');

  async getShops(
    user: User,
  ): Promise<Shop[]> {
    const query = this.createQueryBuilder('shops');

    try {
      const shops = await query.getMany();
      return shops;
    } catch (error) {
      this.logger.error(`Failed to get shops for user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
