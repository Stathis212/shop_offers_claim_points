import { ApiModelProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  newPassword: string;

  @ApiModelProperty()
  currentPassword: string;
}
