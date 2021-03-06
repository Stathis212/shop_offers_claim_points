import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { Purchase } from '../../core/entities/purchase.entity';
import { User } from '../../core/entities/user.entity';

@EntityRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase> {
  private logger = new Logger('PurchaseRepository');

  async getPurchases(
    user: User,
  ): Promise<Purchase[]> {
    const query = this.createQueryBuilder('purchases');

    query.where('purchase.userId = :userId', { userId: user.id });

    try {
      const purchases = await query.getMany();
      return purchases;
    } catch (error) {
      this.logger.error(`Failed to get purchases for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
