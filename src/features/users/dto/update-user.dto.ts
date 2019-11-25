import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty()
  readonly email: string;
}
