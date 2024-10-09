import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '@/common/role.enum';
import { Semester } from '@/semester/entities/semester.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Semester, (semester) => semester.students)
  @JoinTable()
  semesters: Semester[];
}
