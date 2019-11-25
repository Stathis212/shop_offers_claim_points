import { IsDate, IsIn, IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

import { Category } from '../../../features/categories/category.entity';
import { OfferStatus } from '../offer-status.enum';

export class CreateOfferDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  @IsDate()
  dateFrom: Date;

  @IsNotEmpty()
  @IsDate()
  dateTo: Date;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsIn([OfferStatus.ACTIVE, OfferStatus.INACTIVE])
  status: OfferStatus;

  @IsNotEmpty()
  categories: Category[];
}
