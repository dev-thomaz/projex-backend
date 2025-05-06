import { DataSource, DataSourceOptions } from 'typeorm';
import { Task } from '../task/task.entity';
import { Project } from '../project/project.entity';
import { Stage } from '../stage/stage.entity';

import * as dotenv from 'dotenv';
dotenv.config();



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Task, Project, Stage],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
