const logger = require('log4js').getLogger();

let server;
class Server {
    constructor(_port) {
        // Attempt at better error handling
        process.on('unhandledRejection', (reason, p) => {
            logger.error(`Unhandled Rejection at: Promise ${p} 'reason: ${reason}'`);
        });
        this.port = _port;
        this._config();
    }

    _config() {
        const express = require('express');
        const api = require('./src/api/index');
        const io = require('socket.io');
        const socketService = require('./src/service/socket_service').getIOService();

        this.app = express();
        this.app.use(express.json());
        this.app.use('/api/v1', api);

        // Static dir
        this.app.use(express.static(process.cwd() + "/public/whiteboard-app")); 
        this.app.use(express.static(__dirname + '/uploads')); // Was meant for file uploads, like images to be stored.

        this.app.get('*', (req, res) => {
            res.sendFile(process.cwd() + '/public/whiteboard-app/index.html');
        });

        // Create Server
        this.server = require('http').createServer(this.app);

        // Setup socket.io
        this.sio = io(this.server, {
            path: '/api/socket.io',
            port: process.env.PORT,
        });
        socketService.init(this.sio);

        const HOST = (process.env.HOST || '0.0.0.0'); // default host 0.0.0.0

        this.server.listen(this.port, () => {
            logger.info(`Running on http://${HOST}:${this.port}`);
        });

        this.server.on('error', (e) => {
            logger.info(`Error when starting server, error: ${e}`);
        })
    }
}

exports.getServer = () => {
    if (!server) {
        server = new Server(process.env.PORT || 8080);
    }
    return server;
};