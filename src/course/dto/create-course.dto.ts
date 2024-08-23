import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  tutorId?: number;

  @MaxLength(20, {
    each: true,
  })
  tags: string[];
}
