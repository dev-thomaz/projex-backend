// src/project/project.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto): Promise<Project | null> {
    return this.projectService.update(parseInt(id, 10), updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(parseInt(id, 10));
  }
}