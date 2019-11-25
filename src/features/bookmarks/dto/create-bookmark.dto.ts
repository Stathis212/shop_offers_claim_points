import { IsNotEmpty } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  offerId: number;

  @IsNotEmpty()
  profileId: number;
}
