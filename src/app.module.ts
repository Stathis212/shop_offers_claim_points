import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { CitiesModule } from './cities/cities.module';
import { typeOrmConfig } from './config/typeorm.config';
import { OffersModule } from './offers/offers.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [
    AuthModule,
    BookmarksModule,
    CitiesModule,
    OffersModule,
    ProfilesModule,
    PurchasesModule,
    ShopsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
