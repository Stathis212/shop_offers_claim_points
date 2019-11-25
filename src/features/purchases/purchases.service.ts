import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Purchase } from '../../core/entities/purchase.entity';
import { User } from '../../core/entities/user.entity';
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
