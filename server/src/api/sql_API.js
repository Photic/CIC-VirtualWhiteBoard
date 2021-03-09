const backup_control = (() => {
    // ? private

    // ! Imports
    const db_c = require('../control/sqlite_control');
    const db_query = require('../scripts/db_query')

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
        }
    };
})();

module.exports = backup_control;