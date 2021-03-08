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

            await socket.on('image:update:all', async () => {
                const files = await readdir('uploads/', { withFileTypes: true })
                    .then(res => res)
                    .catch(error => { logger.error(`socket.on image => ${error}`); process.exit(1); });

                const fileNames = files.filter(file => file.isFile());
                
                fileNames.sort((a, b) => {
                    let objectA = new Date(fs.statSync(`uploads/${a.name}`).birthtime).getTime();
                    let objectB = new Date(fs.statSync(`uploads/${b.name}`).birthtime).getTime();
                    return objectB - objectA;
                });

                for (const file in fileNames) {
                    if (fileNames.hasOwnProperty(file)) {
                        const element = fileNames[file].name;
                        if (res.rows.length > 0) {
                            await fs.readFile(`./uploads/thumbnails/thumbnails-${res.rows[0].savedas}`, async (error, buffer) => {
                                if (error) {
                                    logger.error(error);
                                    return;
                                }
                                if (res.rows.length === 1) {
                                    await socket.emit('image:update', { ...res.rows[0], buffer: `data:${res.rows[0].mimetype};base64,` + buffer.toString("base64") });
                                }
                            });
                        }
                    }
                }
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