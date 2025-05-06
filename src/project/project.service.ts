// src/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'stages'],
    });
  }

  async update(id: number, updateProjectDto: CreateProjectDto): Promise<Project | null> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.projectRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}