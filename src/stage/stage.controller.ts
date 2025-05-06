// src/stage/stage.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { StageService } from './stage.service';
import { Stage } from './stage.entity';
import { CreateStageDto } from './dto/create-stage.dto';

@Controller('stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createStageDto: CreateStageDto): Promise<Stage> {
    return this.stageService.create(createStageDto);
  }

  @Get('project/:projectId')
  async findAllByProject(@Param('projectId') projectId: string): Promise<Stage[]> {
    return this.stageService.findAllByProject(parseInt(projectId, 10));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Stage> {
    return this.stageService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateStageDto: Partial<CreateStageDto>): Promise<Stage | null> {
    return this.stageService.update(parseInt(id, 10), updateStageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.stageService.remove(parseInt(id, 10));
  }
}