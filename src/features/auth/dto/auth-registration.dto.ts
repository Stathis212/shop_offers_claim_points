import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserRole } from '../../users/user.enum';

export class AuthRegistrationDto {

  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak.' })
  password: string;

  @IsEnum(UserRole)
  roles: UserRole[];
}
