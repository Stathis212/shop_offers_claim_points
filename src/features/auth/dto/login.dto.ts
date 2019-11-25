import { ApiModelProperty } from '@nestjs/swagger';

import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiModelProperty({required: true, minLength: 5, maxLength: 50})
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @ApiModelProperty({required: true, minLength: 8, maxLength: 20})
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak.' })
  password: string;
}
