import { ApiModelProperty } from '@nestjs/swagger';

import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserRole } from '../../users/user.enum';

export class RegisterUserDto {
  @ApiModelProperty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak.' })
  password: string;

  @ApiModelProperty({ enum: ['admin', 'client', 'shop', 'union']})
  @IsEnum(UserRole)
  roles: UserRole;
}
