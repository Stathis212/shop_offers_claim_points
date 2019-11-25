import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
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

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: User,
  ): Promise<Offer> {
    return this.offerRepository.createOffer(createOfferDto, user);
  }
}
