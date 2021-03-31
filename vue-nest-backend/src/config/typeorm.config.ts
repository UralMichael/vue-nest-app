/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfigInterface } from './db-config.interface';

const dbConfig = config.get('db') as DbConfigInterface;
export const typeOrmConfig: TypeOrmModuleOptions = {
  // @ts-ignore
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  // @ts-ignore
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // @ts-ignore
  synchronize: process.env.TYPE_ORM_SYNC || dbConfig.synchronize,
};
