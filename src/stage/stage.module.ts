// src/stage/stage.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';
import { Stage } from './stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService], 
})
export class StageModule {}