import { config } from 'dotenv';

config();

export const port = parseInt(process.env.PORT, 10) || 3000;

export const connectionString = process.env.CONNECTION_STRING;
