import { createPool, Pool } from 'mysql';

export const pool: Pool = createPool({
  port: parseInt(process.env.DB_PORT || '3306'),
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});



