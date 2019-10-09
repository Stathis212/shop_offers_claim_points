import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Offer } from './offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(AuthGuard())
export class OffersController {
  private logger = new Logger('OffersController');

  constructor(private offersService: OffersService) {}

  @Get()
  public getOffers(
    @GetUser() user: User,
  ): Promise<Offer[]> {
    this.logger.verbose(`User "${user.username}" retrieving all offers.`);
    return this.offersService.getOffers(user);
  }

}
