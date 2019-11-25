import {
  Body, Controller, Get, Logger, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
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
    this.logger.verbose(`User "${user.email}" retrieving all offers.`);
    return this.offersService.getOffers(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() user: User,
  ): Promise<Offer> {
    this.logger.verbose(`User "${user.email}" creating new task. Data: ${JSON.stringify(createOfferDto)}`);
    return this.offersService.createOffer(createOfferDto, user);
  }

}
