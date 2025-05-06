// src/project/dto/create-project.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}