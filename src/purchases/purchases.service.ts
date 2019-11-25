import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Purchase } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository,
  ) {}

  async getPurchases(
    user: User,
  ): Promise<Purchase[]> {
    return this.purchaseRepository.getPurchases(user);
  }
}
