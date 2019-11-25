import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './features/auth/auth.module';
import { BookmarksModule } from './features/bookmarks/bookmarks.module';
import { CitiesModule } from './features/cities/cities.module';
import { OffersModule } from './features/offers/offers.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { PurchasesModule } from './features/purchases/purchases.module';
import { ShopsModule } from './features/shops/shops.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    AuthModule,
    BookmarksModule,
    CitiesModule,
    OffersModule,
    ProfilesModule,
    PurchasesModule,
    ShopsModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
