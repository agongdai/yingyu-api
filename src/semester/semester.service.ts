import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Semester } from '@/semester/entities/semester.entity';

import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
  ) {}

  create(createSemesterDto: CreateSemesterDto) {
    return this.semesterRepository.save(createSemesterDto);
  }

  findAll() {
    return `This action returns all semester`;
  }

  findOne(id: number) {
    return `This action returns a #${id} semester`;
  }

  update(id: number, updateSemesterDto: UpdateSemesterDto) {
    return `This action updates a #${id} semester`;
  }

  remove(id: number) {
    return `This action removes a #${id} semester`;
  }
}
