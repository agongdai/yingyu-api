import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
