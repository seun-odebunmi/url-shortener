import { environment } from './env';
import * as config from '../config/config.json';

const { dialect, username, password, host, port, database } = config.default[environment];

export const DB_CONFIG = {
  url: `${dialect}://${username}:${password}@${host}:${port}/${database}`,
  database: database,
  username: username,
  password: password,
  options: {
    host: host,
    port: port,
    dialect: dialect,
    define: {
      freezeTableName: false,
      timestamps: false
    }
  },
  // pool configuration used to pool database connections
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000
  }
};
