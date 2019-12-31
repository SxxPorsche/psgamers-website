const express = require('express');
const logger = require('./logger');
const GLOBAL = require('../global');

const GLOBAL_ENV = GLOBAL[process.env.Env] || {};

const HOST = GLOBAL_ENV.HOST;
const PORT = GLOBAL_ENV.PORT;


const middleware = require('./middleware');

const app = express();
const proxy = require('http-proxy-middleware');

app.use('/api', proxy({
  target: HOST,
  changeOrigin: true,
}));

middleware(app, {
  outputPath: resolve(process.cwd(), 'local'),
  publicPath: '/',
});

app.listen(PORT, HOST, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(PORT, HOST);
});
