import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Shop } from './shop.entity';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseGuards(AuthGuard())
export class ShopsController {
  private logger = new Logger('ShopsController');

  constructor(private shopsService: ShopsService) {}

  @Get()
  public getShops(
    @GetUser() user: User,
  ): Promise<Shop[]> {
    this.logger.verbose(`User "${user.email}" retrieving all shops.`);
    return this.shopsService.getShops(user);
  }

}
