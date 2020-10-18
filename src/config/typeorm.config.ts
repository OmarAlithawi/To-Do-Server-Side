import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const DB_CONFIG = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DB_CONFIG.type,
  host: process.env.DB_HOSTNAME || DB_CONFIG.host,
  port: process.env.DB_PORT || DB_CONFIG.port,
  username: process.env.DB_USERNAME || DB_CONFIG.username,
  password: process.env.DB_PASSWORD || DB_CONFIG.password,
  database: process.env.DB_DB_NAME || DB_CONFIG.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.SYNC || DB_CONFIG.synchronize,
};
