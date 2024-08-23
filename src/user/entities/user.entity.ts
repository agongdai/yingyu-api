import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '@/course/entities/course.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column('simple-array')
  roles: string[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Course, (course) => course.tutor)
  courses: Course[];
}
