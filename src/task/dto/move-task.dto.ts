// src/task/dto/move-task.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MoveTaskDto {
  @IsNotEmpty()
  @IsNumber()
  stageId: number;
}