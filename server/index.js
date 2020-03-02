const express = require('express');
const path = require('path');
const logger = require('./logger');
const GLOBAL = require('../global');

const GLOBAL_ENV_CONFIG = GLOBAL[process.env.ENV] || {};

const middleware = require('./middleware');

const app = express();
const proxy = require('http-proxy-middleware');

GLOBAL_ENV_CONFIG.forEach((config) => {
  app.use(config.match, proxy({
    target: config.host,
    changeOrigin: true,
  }));

});

middleware(app, {
  outputPath: path.resolve(process.cwd(), 'local'),
  publicPath: '/',
});

const listenHost = 'localhost';
const listenPort = 3000;

app.listen(listenPort, listenHost, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(listenPort, listenHost);
});
