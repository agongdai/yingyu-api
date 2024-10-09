import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Semester } from '@/semester/entities/semester.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column('simple-array')
  tags: string[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Semester, (semester) => semester.course)
  semesters: Semester[];
}
