// src/project/project.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService], // Exportamos o serviço para que outros módulos possam usá-lo
})
export class ProjectModule {}