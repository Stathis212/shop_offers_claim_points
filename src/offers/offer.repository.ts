import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Offer } from './offer.entity';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  private logger = new Logger('OfferRepository');

  async getOffers(
    user: User,
  ): Promise<Offer[]> {
    const query = this.createQueryBuilder('offers');

    query.where('offer.shop.cityId = :cityId', { cityId: user.profile.city.id });

    try {
      const offers = await query.getMany();
      return offers;
    } catch (error) {
      this.logger.error(`Failed to get offers for user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
