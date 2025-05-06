// src/project/project.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';
import { Stage } from '../stage/stage.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Stage, (stage) => stage.project)
  stages: Stage[];
}