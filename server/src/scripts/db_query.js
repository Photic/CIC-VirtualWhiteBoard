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
    createSmallImagePost: () => {
        return `INSERT INTO gridItems(cols, rows, title, team, picture, date) VALUES(?1, ?2, ?3, ?4, ?5, datetime('now', 'localtime'))`
    },
    createSmallTextPost: () => {
        return `INSERT INTO gridItems(cols, rows, title, body, team, date) VALUES(?1, ?2, ?3, ?4, ?5, datetime('now', 'localtime'))`
    },
    createLargePost: () => {
        return `INSERT INTO gridItems(cols, rows, title, body, team, picture, date) VALUES(?1, ?2, ?3, ?4, ?5, ?6, datetime('now', 'localtime'))`
    }
}