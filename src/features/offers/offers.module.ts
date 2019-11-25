import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { OfferRepository } from './offer.repository';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([OfferRepository]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
