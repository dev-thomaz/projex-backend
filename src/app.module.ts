// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module'; // Importe o TaskModule

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().valid('postgres').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ProjectModule,
    TaskModule, // Adicione o TaskModule aos imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}