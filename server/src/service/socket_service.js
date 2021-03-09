const logger = require('log4js').getLogger();
const util = require('util');
const fs = require('fs');
const socketioJwt = require('socketio-jwt');

const readdir = util.promisify(fs.readdir);

let socketService;

class SocketService {
    init(io) {
        this.io = io;

        this.io.use(socketioJwt.authorize({
            secret: process.env.SECRET,
            handshake: true
        }));

        this.io.on('error', (error) => {
            logger.error(error);
        })

        this.io.on('connection', async (socket) => {
            logger.debug(`User  with socketId=${socket.id} connected`);

            socket.on('disconnect', () => {
                logger.debug('user disconnected');
            });
        });
    }

    emit(event, data) {
        return this.io.emit(event, data);
    }

    on(event, exec) {
        return this.io.on(event, exec);
    }
}

exports.getIOService = () => {
    if (!socketService) {
        socketService = new SocketService();
    }
    return socketService;
}