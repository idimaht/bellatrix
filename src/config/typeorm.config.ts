import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.{ts,js}'],
};

export default registerAs('typeorm', () => dataSourceOptions);
export const connectionSource = new DataSource(dataSourceOptions);
