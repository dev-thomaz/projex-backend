// src/stage/stage.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Project } from '../project/project.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Project, (project) => project.stages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @OneToMany(() => Task, (task) => task.stage)
  tasks: Task[];
}