import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSemesterDto {
  @IsString()
  name: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsNumber()
  courseId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
