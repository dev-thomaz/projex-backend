// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { StageService } from '../stage/stage.service'; 
import { TaskOrderDto } from './dto/update-task-order.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly stageService: StageService, 
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAllByProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
      relations: ['stage'],
      order: { order: 'ASC' }, 
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'stage'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: Partial<CreateTaskDto>): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOne({ where: { id }, relations: ['project', 'stage'] });
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async moveTask(taskId: number, newStageId: number): Promise<Task> {
    const task = await this.findOne(taskId); 
    const stage = await this.stageService.findOne(newStageId); 

    task.stage = stage;
    return this.taskRepository.save(task);
  }

  async updateTaskOrderForProject(projectId: number, tasks: { id: number; order: number }[]): Promise<void> {
    const tasksInProject = await this.findAllByProject(projectId);
    const taskIdsInProject = tasksInProject.map(task => task.id);

    if (tasks.every(task => taskIdsInProject.includes(task.id))) {
        throw new NotFoundException(`One or more task IDs do not belong to project with ID "${projectId}"`);
    }

    await Promise.all(
        tasks.map(async (taskData) => {
            const task = await this.taskRepository.findOneBy({ id: taskData.id });
            if (!task) {
                throw new NotFoundException(`Task with id ${taskData.id} not found`); 
            }
            task.order = taskData.order;
            await this.taskRepository.save(task);
        }),
    );
}

  async findManyByIdsAndProject(taskIds: number[], projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        id: In(taskIds),
        project: { id: projectId },
      },
      relations: ['stage'],
    });
  }
}