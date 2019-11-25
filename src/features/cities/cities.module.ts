import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from './city.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CityRepository]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
