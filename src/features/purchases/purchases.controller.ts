import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { Purchase } from './purchase.entity';
import { PurchasesService } from './purchases.service';

@ApiUseTags('purchases')
@ApiBearerAuth()
@Controller('api/purchases')
@UseGuards(AuthGuard())
export class PurchasesController {
  private logger = new Logger('PurchasesController');

  constructor(private purchasesService: PurchasesService) {}

  @Get()
  public getPurchases(
    @GetUser() user: User,
  ): Promise<Purchase[]> {
    this.logger.verbose(`User "${user.email}" retrieving all purchases.`);
    return this.purchasesService.getPurchases(user);
  }

}
