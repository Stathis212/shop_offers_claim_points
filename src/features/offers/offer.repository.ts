import { InternalServerErrorException, Logger } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
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
      this.logger.error(`Failed to get offers for user "${user.email}"`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: User,
  ): Promise<Offer> {
    const { name, description, status } = createOfferDto;

    const query = this.createQueryBuilder('shops');

    query.where('shop.id = :shopId', { shopId: user.shop.id });

    const shop = await query.getRawOne();

    const offer = new Offer();
    offer.name = name;
    offer.description = description;
    offer.status = status;
    offer.shop = shop;

    try {
      await offer.save();
    } catch (error) {
      this.logger.error(`Failed to create task for user "${user.email}". Data: ${createOfferDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete offer.shop;

    return offer;
  }
}
