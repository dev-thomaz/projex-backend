// src/stage/dto/create-stage.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}