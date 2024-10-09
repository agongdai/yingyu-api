import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Semester } from '@/semester/entities/semester.entity';

import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  controllers: [SemesterController],
  providers: [SemesterService],
})
export class SemesterModule {}
