// src/task/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../project/project.entity';
import { Stage } from '../stage/stage.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @ManyToOne(() => Stage, (stage) => stage.tasks)
  @JoinColumn({ name: 'stageId' })
  stage: Stage;

  @Column()
  stageId: number;
}