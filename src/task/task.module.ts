// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService], // Exportamos o serviço para que outros módulos possam usá-lo
})
export class TaskModule {}