const { getSourceMapRange } = require('typescript');

const sqlite_control = (() => {
    // ? private

    // ! Imports
    const sqlite3 = require('sqlite3');
    const { open } = require('sqlite');
    const logger = require('log4js').getLogger();
    const fs = require('fs');

    // ! Parameters
    const dbName = 'database.db'

    // ! Functions
    const files = fs.readdirSync('./', (err, files) => files);
    if (!files.includes(dbName)) {
        initDb();
    }

    async function initDb() {
        const db = await getDb();
        initTables(db);
    }

    async function initTables(db) {
        await db.exec(`CREATE TABLE IF NOT EXISTS users(username TEXT UNIQUE, password TEXT, team TEXT)`);
        await db.exec(`CREATE TABLE IF NOT EXISTS gridItems(cols INTEGER, rows INTEGER, y INTEGER DEFAULT 0, x INTEGER DEFAULT 0, itemId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, team TEXT, picture TEXT, date TEXT)`);
        await db.exec(`INSERT INTO users(username, password, team) VALUES('Bertha@this.whiteboard.com', '$2b$10$wYcqlPj70LglL392zDwq3eU7vspMA.K.35qi6qX3NLmNiW0QoDzw6', 'Team 1')`);
        await db.exec(`INSERT INTO users(username, password, team) VALUES('Sam@this.whiteboard.com', '$2b$10$$2b$10$0jFjhG8asNCnIoap9id.q.nEz9dg2r2T8i3OuBLKXDB5PVT06UMce', 'Team 2')`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, body, team, picture, date) VALUES(20, 24, 'Shiba Inu', 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.', 'Team 1', 'https://material.angular.io/assets/img/examples/shiba2.jpg', datetime('now', 'localtime'))`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, team, picture, date) VALUES(10, 12, 'Shiba Inu', 'Team 2', 'https://material.angular.io/assets/img/examples/shiba2.jpg', datetime('now', 'localtime'))`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, body, team, date) VALUES(10, 12, 'Shiba Inu', 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.','Team 2', datetime('now', 'localtime'))`);
        await showTables(db);
    }

    async function showTables(db) {
        await db.each("SELECT name FROM sqlite_master WHERE type='table'", (e, d) => logger.info(d));
        await db.each("SELECT * FROM users", (e, d) => logger.info(d));
        await db.each("SELECT * FROM gridItems", (e, d) => logger.info(d));
        await db.close();
    }

    async function getDb() {
        const db = await open({
            filename: `./${dbName}`,
            driver: sqlite3.Database
        }).catch((err) => logger.error(err));
        return db;
    }

    async function dbGetArgs(query, args) {
        const db = await getDb();
        const res = await db.get(query, args);
        await db.close();
        return res;
    }

    async function dbQueryArgs(query, args) {
        const db = await getDb();
        const res = await db.exec(query, args);
        await db.close();
        return res;
    }

    async function dbGet(query) {
        const db = await getDb();
        const res = await db.get(query);
        await db.close();
        return res;
    }

    async function dbAll(query) {
        const db = await getDb();
        const res = await db.all(query);
        await db.close();
        return res;
    }

    async function dbRunArgs(query, args) {
        const db = await getDb();
        const res = await db.run(query, args);
        await db.close();
        return res;
    }

    return { // ? public
        dbQueryArgs: async (query, args) => {
            return await dbQueryArgs(query, args);
        },
        dbGetArgs: async (query, args) => {
            return await dbGetArgs(query, args);
        },
        dbAll: async (query) => {
            return await dbAll(query);
        },
        dbRunArgs: async (query, args) => {
            return await dbRunArgs(query, args);
        }
    };
})();

module.exports = sqlite_control;