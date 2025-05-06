// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAllByProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
      relations: ['stage'],
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
}