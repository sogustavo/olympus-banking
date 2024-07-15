import { config } from 'dotenv';

config();

export const port = parseInt(process.env.PORT, 10) || 3000;

export const mongo = {
  connectionString: process.env.MONGO__CONNECTION_STRING,
};

export const aws = {
  sqs: {
    endpoint: process.env.AWS__SQS__ENDPOINT,
    queue: process.env.AWS__SQS__QUEUE,
  },
  accessKeyId: process.env.AWS__ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS__SECRET_ACCESS_KEY,
  region: process.env.AWS__REGION,
  sslEnabled: process.env.AWS__SSL_ENABLED === 'true',
};
