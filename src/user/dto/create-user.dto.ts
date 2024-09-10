import { IsEmail, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

import { Role } from '@/common/role.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be greater than or equal to 18' })
  @Max(65, { message: 'Age must be less than or equal to 65' })
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @MaxLength(10, {
    each: true,
  })
  roles: Role[];
}
