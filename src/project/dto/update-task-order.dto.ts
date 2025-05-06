import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateTaskOrderDto {
  @IsArray()
  @IsNotEmpty()
  taskIds: number[]; 
}