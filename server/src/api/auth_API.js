const OAuth = (() => {
    // ? private

    // ! Imports
    const logger = require('log4js').getLogger();
    const jwt = require('jsonwebtoken');
    const db_c = require('../control/sqlite_control');
    const db_query = require('../scripts/db_query');
    const bcrypt = require("bcrypt");

    // ! Parameters

    // ! Functions
    async function createUser(req, res) {
        const body = req.body;

        if (!(body.user && body.password)) {
            return res.status(400).send({ error: "Data not formatted properly" });
        }

        let password;

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        password = await bcrypt.hash(body.password, salt);

        console.log(password);

        const dbRes = await db_c.dbRunArgs(db_query.createNewUser(), [body.user, password, body.team]).catch(() => {
            res.status(400).send({ msg: "User already exists" });
        });

        if (dbRes.changes === 1) {
            res.status(201).send({ msg: "User Created" });
        }

        res.status(400).send({ msg: "Internal Server Error" });
    }

    async function authentication(req, res) {
        try {
            const user = req.body.user;
            const password = req.body.password;

            const db_user = await db_c.dbGetArgs(db_query.getSpecificUser(), [user]).catch(error => logger.error(error));

            if (db_user && await bcrypt.compare(password, db_user.password)) {
                let profile = {
                    username: req.body.userKey,
                    role: 'user'
                }
                logger.debug('Authorized');
                let token = jwt.sign(profile, process.env.SECRET, {});
                return res.json({ token: token });
            } else {
                return res.json({ error: '401 Unauthorized' });
            }
        } catch (error) {
            logger.error(error);
            return res.json({ error: 'Internal server error' });
        }
    }

    async function authorize(req, res, next) {
        if (!req.headers.authorization) {
            res.json({ msg: 'Unauthorized: no authorization header' });
        }

        try {
            let token = req.headers.authorization;
            if (await jwt.verify(token.split(' ')[1], process.env.SECRET)) {
                next();
            }
        } catch (error) {
            logger.error(error);
            return res.json({ msg: 'Authorization failed' });
        }
    }

    return { // ? public
        /**
         * @description Login authentication 
         * @param {Express.Request} req
         * @param {Express.Response} res
         */
        authentication: async (req, res) => {
            return await authentication(req, res);
        },
        /**
         * @description Create new user
         * @param {Express.Request} req
         * @param {Express.Response} res
         */
        createUser: async (req, res) => {
            return await createUser(req, res);
        },
        /**
         * @description Perform the single action of creating an ingress for a namespace og edit existing ingress. 
         * @param {Express.Request} req
         * @param {Express.Response} res
         * @param {Express.next} next
         */
        authorize: async (req, res, next) => {
            return await authorize(req, res, next);
        }
    };
})();

module.exports = OAuth;