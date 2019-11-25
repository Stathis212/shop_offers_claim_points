import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { Shop } from '../../core/entities/shop.entity';
import { User } from '../../core/entities/user.entity';

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
      this.logger.error(`Failed to get shops for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
