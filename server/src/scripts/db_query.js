// The list kinda speaks for it self. Central place for DB query's.
module.exports = {
    getSpecificUser: () => {
        return 'SELECT * FROM users WHERE username = ?';
    },
    createNewUser: () => {
        return `INSERT INTO users(username, password, team) VALUES(?1, ?2, ?3)`;
    },
    getAllPosts: () => {
        return 'SELECT * FROM gridItems';
    },
    getAllUsers: () => {
        return 'SELECT * FROM users';
    },
    deleteSpecificPost: () => {
        return 'DELETE FROM gridItems WHERE itemId = ?1 AND team = ?2'
    },
    deleteSpecificPostModerator: () => {
        return 'DELETE FROM gridItems WHERE itemId = ?'
    },
    createSmallImagePost: () => {
        return `INSERT INTO gridItems(cols, rows, title, team, picture, date) VALUES(?1, ?2, ?3, ?4, ?5, datetime('now', 'localtime'))`
    },
    createSmallTextPost: () => {
        return `INSERT INTO gridItems(cols, rows, title, body, team, date) VALUES(?1, ?2, ?3, ?4, ?5, datetime('now', 'localtime'))`
    },
    createLargePost: () => {
        return `INSERT INTO gridItems(cols, rows, title, body, team, picture, date) VALUES(?1, ?2, ?3, ?4, ?5, ?6, datetime('now', 'localtime'))`
    },
    editUserTeam: () => {
        return `UPDATE users SET team = ?1 WHERE username = ?2;`
    },
    editUserPassword: () => {
        return `UPDATE users SET password = ?1 WHERE username = ?2;`
    }
}