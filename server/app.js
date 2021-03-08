'use strict';

const dotenv = require('dotenv');
dotenv.config();

const expressServer = require('./server');

const logger = require('log4js').getLogger();
logger.level = process.env.LOG_LEVEL;

// Start server and socket.io

expressServer.getServer();