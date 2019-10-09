import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Shop } from './shop.entity';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopRepository)
    private shopRepository: ShopRepository,
  ) {}

  async getShops(
    user: User,
  ): Promise<Shop[]> {
    return this.shopRepository.getShops(user);
  }
}
