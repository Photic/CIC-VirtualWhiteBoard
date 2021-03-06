const backup_control = (() => {
    // ? private

    // ! Imports
    const logger = require('log4js').getLogger();
    const db_c = require('../control/sqlite_control');
    const db_query = require('../scripts/db_query');
    const bcrypt = require("bcrypt");

    // ! Functions
    /**
     * @description Get all posts contained withing the database
     * @param {*} req 
     * @param {*} res 
     */
    async function getPosts(req, res) {
        return await res.json({ msg: await JSON.stringify(await db_c.dbAll(db_query.getAllPosts())) });
    }

    /**
     * @description Create a new small Post
     * @param {*} req 
     * @param {*} res 
     */
    async function postSmallPost(req, res) {
        const body = req.body;
        if (body.picture != null) { // gridItems(cols, rows, title, team, picture, date)
            const dbRes = await db_c.dbRunArgs(db_query.createSmallImagePost(), [body.cols, body.rows, body.title, body.team, body.picture])
            return defaultResponse(dbRes, res, 'Post Created');
        } else { // gridItems(cols, rows, title, body, team, date)
            const dbRes = await db_c.dbRunArgs(db_query.createSmallTextPost(), [body.cols, body.rows, body.title, body.body, body.team]);
            return defaultResponse(dbRes, res, 'Post Created');
        }
    }

    /**
     * @description Create a new large Post 
     * @param {*} req 
     * @param {*} res 
     */
    async function postLargePost(req, res) { // gridItems(cols, rows, title, body, team, picture, date)
        const body = req.body;
        const dbRes = await db_c.dbRunArgs(db_query.createLargePost(), [body.cols, body.rows, body.title, body.body, body.team, body.picture]);
        return defaultResponse(dbRes, res, 'Post Created');
    }

    /**
     * @description Delete a specific post depending on moderator status or team.
     * @param {*} req 
     * @param {*} res 
     */
    async function deletePost(req, res) {
        const body = req.body;
        let dbRes;

        if (!body.team.includes('moderator')) {
            // Only teams can delete team posts, a team could just as well be a person.
            dbRes = await db_c.dbRunArgs(db_query.deleteSpecificPost(), [body.itemId, body.team]);
        } else {
            // Only moderators can delete all team posts.
            dbRes = await db_c.dbRunArgs(db_query.deleteSpecificPostModerator(), [body.itemId]);
        }

        return defaultResponse(dbRes, res, 'Post Deleted');
    }

    /**
     * Only edits the users team data
     * @param {*} req 
     * @param {*} res 
     */
    async function editUser(req, res) {
        const body = req.body;
        const dbRes = await db_c.dbRunArgs(db_query.editUserTeam(), [body.team, body.user]);
        return defaultResponse(dbRes, res, 'User Edited');
    }

    /**
     * Change users password
     * @param {*} req 
     * @param {*} res 
     */
    async function editPassword(req, res) {
        const body = req.body;

        const oldPassword = body.oldPassword;
        const newPassword = body.newPassword;

        const db_user = await db_c.dbGetArgs(db_query.getSpecificUser(), [body.user]).catch(error => logger.error(error));

        if (await bcrypt.compare(oldPassword, db_user.password)) {
            let password;
            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            password = await bcrypt.hash(newPassword, salt);

            const dbRes = await db_c.dbRunArgs(db_query.editUserPassword(), [password, body.user]).catch(() => {
                return res.status(400).send({ msg: "Could not change password" });
            });

            return defaultResponse(dbRes, res, 'Password Changed');
        }

        return res.status(400).send({ msg: "Wrong Password" });
    }

    /**
     * I tried the make this function more Dynamic just for fun, it can replace editTeam easy, but I would not let it replace change password. 
     * @param {*} req 
     * @param {*} res 
     */
    async function editUserDynamic(req, res) {
        const body = req.body;
        const db_user = await db_c.dbGetArgs(db_query.getSpecificUser(), [body.user]).catch(error => logger.error(error));

        if (await bcrypt.compare(req.body.password, db_user.password)) {
            let query = 'UPDATE users '
            const end_quary = 'WHERE username = ?';
            let counter = 1;
            const edited_db_user = [];

            for (let key in body) {
                if (body.hasOwnProperty(key)) {
                    if (!key.includes('user') && !key.includes('password')) {
                        edited_db_user.push(body[key]);
                        if (query.includes('SET')) {
                            query = query + `, ${key} = ?${counter} `
                        } else query = query + `SET ${key} = ?${counter} `
                        counter++;
                    }
                }
            }

            query = query + end_quary + counter;
            edited_db_user.push(db_user.username);

            const dbRes = await db_c.dbRunArgs(query, edited_db_user).catch(() => {
                return res.status(400).send({ msg: "Could not edit user" });
            });

            await db_c.dbEachLogDebug(db_query.getAllUsers());
            return defaultResponse(dbRes, res, 'User edited');
        }

        return res.status(400).send({ msg: "Wrong Password" });
    }

    /**
     * @description Handles all default responses to get rid of duplicate code
     * @param {SQL.response} dbRes 
     * @param {Express.response} res 
     */
    function defaultResponse(dbRes, res, success) {
        if (dbRes.changes === 1) {
            return res.status(201).send({ msg: success });
        }
        return res.status(400).send({ msg: dbRes });
    }

    async function getUsersTeam(req, res) {
        return await res.json({ msg: await JSON.stringify(await db_c.dbGetArgs(db_query.getSpecificUser(), [req.body.msg])) });
    }


    return { // ? public
        getAllPosts: async (req, res) => {
            return await getPosts(req, res);
        },
        postSmallPost: async (req, res) => {
            return await postSmallPost(req, res);
        },
        postLargePost: async (req, res) => {
            return await postLargePost(req, res);
        },
        deletePost: async (req, res) => {
            return await deletePost(req, res);
        },
        getUsersTeam: async (req, res) => {
            return await getUsersTeam(req, res);
        },
        editUser: async (req, res) => {
            return await editUser(req, res);
        },
        editPassword: async (req, res) => {
            return await editPassword(req, res);
        },
        editUserDynamic: async (req, res) => {
            return await editUserDynamic(req, res);
        }
    };
})();

module.exports = backup_control;