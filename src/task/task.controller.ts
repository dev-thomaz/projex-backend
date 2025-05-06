// src/task/task.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task | null> {
    return this.taskService.create(createTaskDto);
  }

  @Get('project/:projectId')
  async findAllByProject(@Param('projectId') projectId: string): Promise<Task[]> {
    return this.taskService.findAllByProject(parseInt(projectId, 10));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateTaskDto: Partial<CreateTaskDto>): Promise<Task | null> {
    return this.taskService.update(parseInt(id, 10), updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(parseInt(id, 10));
  }

  @Patch(':id/move')
  @UsePipes(ValidationPipe)
  async moveTask(@Param('id') id: string, @Body() moveTaskDto: MoveTaskDto): Promise<Task | null> {
    return this.taskService.moveTask(parseInt(id, 10), moveTaskDto.stageId);
  }
  @Put(':projectId/tasks/reorder') 
  async updateTaskOrderForProject(
      @Param('projectId') projectId: number,
      @Body() updateTaskOrderDto: UpdateTaskOrderDto,
  ) {
    console.log(projectId);
    console.log(updateTaskOrderDto);
    
      return this.taskService.updateTaskOrderForProject(projectId, updateTaskOrderDto.tasks);
  }
}