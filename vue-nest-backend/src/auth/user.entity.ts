/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
