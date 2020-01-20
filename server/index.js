const express = require('express');
const path = require('path');
const logger = require('./logger');
const GLOBAL = require('../global');

const GLOBAL_ENV = GLOBAL[process.env.ENV] || {};

const HOST = GLOBAL_ENV.HOST;
const PORT = GLOBAL_ENV.PORT;


const middleware = require('./middleware');

const app = express();
const proxy = require('http-proxy-middleware');

app.use('/api', proxy({
  target: HOST,
  changeOrigin: true,
}));

app.use('/file-api/upload', function (req, res) {
  console.log(req);
});

middleware(app, {
  outputPath: path.resolve(process.cwd(), 'local'),
  publicPath: '/',
});

const listenHost = 'localhost';

app.listen(PORT, listenHost, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(PORT, listenHost);
});
