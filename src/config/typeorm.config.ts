import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const DB_CONFIG = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DB_CONFIG.type,
  host: process.env.RDS_HOST || DB_CONFIG.host,
  port: process.env.RDS_PORT || DB_CONFIG.port,
  username: process.env.RDS_USERNAME || DB_CONFIG.username,
  password: process.env.RDS_PASSWORD || DB_CONFIG.password,
  database: process.env.RDS_DB || DB_CONFIG.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.SYNC || DB_CONFIG.synchronize,
};
