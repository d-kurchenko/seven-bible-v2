import path from 'node:path';
import dotenv from 'dotenv';

const envPath = path.join(require.main.path, '../.env');

export const loadEnv = () => dotenv.config({
  path: envPath,
});
