// src/task/dto/create-task.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @IsNumber()
  stageId: number;
}