const { NODE_PORT, NODE_HOST, NODE_ENV } = process.env;

const configurations = {
  production: {
    ssl: true,
    port: NODE_PORT,
    hostname: NODE_HOST
  },
  development: {
    ssl: false,
    port: 4000,
    hostname: 'localhost'
  }
};
const environment = NODE_ENV || 'development';

const SERVER_CONFIG = configurations[environment];
const ENDPOINT = `http://${SERVER_CONFIG.hostname}:${SERVER_CONFIG.port}`;

export { SERVER_CONFIG, ENDPOINT, environment };
