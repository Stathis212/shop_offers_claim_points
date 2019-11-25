import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { Shop } from '../../core/entities/shop.entity';
import { User } from '../../core/entities/user.entity';
import { ShopsService } from './shops.service';

@ApiUseTags('shops')
@ApiBearerAuth()
@Controller('api/shops')
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
