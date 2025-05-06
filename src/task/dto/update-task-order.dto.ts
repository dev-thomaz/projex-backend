import { IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskOrderDto {
    @IsNumber()
    id: number;

    @IsNumber()
    order: number;
}

export class UpdateTaskOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaskOrderDto)
    tasks: TaskOrderDto[];
}