import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';

import apis from './api';
import { sequelize, models } from './models';
import { SERVER_CONFIG, ENDPOINT } from './constants';

const app = express();
app.use(bodyParser.json());
app.use(cors(), helmet());

apis(app, models);

const server = createServer(app);

sequelize
  .sync()
  .then(async () => {
    server.listen({ port: SERVER_CONFIG.port }, () => {
      console.log(`🚀  Server ready at ${ENDPOINT}  `);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
