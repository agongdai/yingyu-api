import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '@/course/entities/course.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => User, (user) => user.semesters)
  students: User[];

  @ManyToOne(() => Course, (course) => course.semesters)
  course: Course;

  @Column()
  courseId: number;
}
