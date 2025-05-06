// src/stage/stage.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './stage.entity';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository: Repository<Stage>,
  ) {}

  async create(createStageDto: CreateStageDto): Promise<Stage> {
    const stage = this.stageRepository.create(createStageDto);
    return this.stageRepository.save(stage);
  }

  async findAllByProject(projectId: number): Promise<Stage[]> {
    return this.stageRepository.find({
      where: { project: { id: projectId } },
      order: { order: 'ASC' }, // Ordenar as etapas pela ordem
      relations: ['tasks'],
    });
  }

  async findOne(id: number): Promise<Stage> {
    const stage = await this.stageRepository.findOne({ where: { id }, relations: ['project', 'tasks'] });
    if (!stage) {
      throw new NotFoundException(`Stage with ID "${id}" not found`);
    }
    return stage;
  }

  async update(id: number, updateStageDto: Partial<CreateStageDto>): Promise<Stage | null> {
    const stage = await this.stageRepository.findOne({ where: { id } });
    if (!stage) {
      throw new NotFoundException(`Stage with ID "${id}" not found`);
    }
    await this.stageRepository.update(id, updateStageDto);
    return this.stageRepository.findOne({ where: { id }, relations: ['project', 'tasks'] });
  }

  async remove(id: number): Promise<void> {
    const result = await this.stageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Stage with ID "${id}" not found`);
    }
  }
}