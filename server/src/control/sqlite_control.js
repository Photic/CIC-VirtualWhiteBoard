const sqlite_control = (() => {
    // ? private

    // ! Imports
    const sqlite3 = require('sqlite3');
    const { open } = require('sqlite');
    const logger = require('log4js').getLogger();
    const fs = require('fs');

    // ! Parameters
    const dbName = 'database.db' // Stop magical names

    // ! Functions
    // Check for the database locally, if it is not there we create it. 
    const files = fs.readdirSync('./', (err, files) => files);
    if (!files.includes(dbName)) {
        initDb();
    }

    /**
     * @description does as it says, initiate the database
     */
    async function initDb() {
        const db = await getDb();
        initTables(db);
    }

    /**
     * @description Create tables and some default values, to not have an empty UI.
     * @param {*} db 
     */
    async function initTables(db) {
        await db.exec(`CREATE TABLE IF NOT EXISTS users(username TEXT UNIQUE, password TEXT, team TEXT, name TEXT)`);
        await db.exec(`CREATE TABLE IF NOT EXISTS gridItems(cols INTEGER, rows INTEGER, y INTEGER DEFAULT 0, x INTEGER DEFAULT 0, itemId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, team TEXT, picture TEXT, date TEXT)`);
        await db.exec(`INSERT INTO users(username, password, team, name) VALUES('Bertha@this.whiteboard.com', '$2b$10$wYcqlPj70LglL392zDwq3eU7vspMA.K.35qi6qX3NLmNiW0QoDzw6', 'Team 1', 'Bertha Majster')`);
        await db.exec(`INSERT INTO users(username, password, team, name) VALUES('Sam@this.whiteboard.com', '$2b$10$QEDBdA1b7X7nXCIcsvC2f.qAZ1lQtLCsp1rPimCt1uR3NEO2IaoCq', 'Team 2', 'Sam Snam')`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, body, team, picture, date) VALUES(20, 24, 'Shiba Inu', 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.', 'Team 1', 'https://material.angular.io/assets/img/examples/shiba2.jpg', datetime('now', 'localtime'))`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, team, picture, date) VALUES(10, 12, 'Shiba Inu', 'Team 2', 'https://material.angular.io/assets/img/examples/shiba2.jpg', datetime('now', 'localtime'))`);
        await db.exec(`INSERT INTO gridItems(cols, rows, title, body, team, date) VALUES(10, 12, 'Shiba Inu', 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.','Team 2', datetime('now', 'localtime'))`);
        await showTables(db);
    }

    /**
     * @description More a debug function then anything else, just visually inspect if everything has been created.
     * @param {*} db 
     */
    async function showTables(db) {
        await db.each("SELECT name FROM sqlite_master WHERE type='table'", (e, d) => logger.debug(d));
        await db.each("SELECT * FROM users", (e, d) => logger.debug(d));
        await db.each("SELECT * FROM gridItems", (e, d) => logger.debug(d));
        await db.close();
    }

    /**
     * @description Generic function to open a database connection. 
     */
    async function getDb() {
        const db = await open({
            filename: `./${dbName}`,
            driver: sqlite3.Database
        }).catch((err) => logger.error(err));
        return db;
    }

   /**
    * @description Get something from the database with attached arguments to specify what to get.
    * @param {string} query 
    * @param {array} args 
    */ 
    async function dbGetArgs(query, args) {
        const db = await getDb();
        const res = await db.get(query, args);
        await db.close();
        return res;
    }

    /**
     * @description Exec something in the database with attached arguments.
     * @param {string} query 
     * @param {array} args 
     */
    async function dbQueryArgs(query, args) {
        const db = await getDb();
        const res = await db.exec(query, args);
        await db.close();
        return res;
    }

    /**
     * @description Queary a large number of items, e.x SELECT * FROM
     * @param {string} query 
     */
    async function dbAll(query) {
        const db = await getDb();
        const res = await db.all(query);
        await db.close();
        return res;
    }

    /**
     * @description Most used and most versatile, accepts most commands.
     * Same here, attached arguments to go through some kind of db sanitizer.
     * @param {string} query 
     * @param {array} args 
     */
    async function dbRunArgs(query, args) {
        const db = await getDb();
        const res = await db.run(query, args);
        await db.close();
        return res;
    }

    /**
     * @description Again mostly for debugging, its just handy to be able to get elements printed.
     * @param {string} query 
     */
    async function dbEachLogDebug(query) {
        const db = await getDb();
        const res = await db.each(query, (e, d) => {logger.debug(d)});
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
        },
        dbEachLogDebug: async (query) => {
            return dbEachLogDebug(query);
        }
    };
})();

module.exports = sqlite_control;