import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ShopRepository } from './shop.repository';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ShopRepository]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
