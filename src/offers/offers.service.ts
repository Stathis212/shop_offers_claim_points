import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Offer } from './offer.entity';
import { OfferRepository } from './offer.repository';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async getOffers(
    user: User,
  ): Promise<Offer[]> {
    return this.offerRepository.getOffers(user);
  }
}
