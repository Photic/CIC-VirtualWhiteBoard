// ! Imports
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// ! Endpoints
const auth = require('./auth_API');
const sql = require('./sql_API');

// ***********************************
// ** authentication                **
// ***********************************
router.post('/auth', auth.authentication);
router.post('/new/user', auth.createUser);
router.use(auth.authorize);

// ***********************************
// ** sql_API                       **
// ***********************************
// ! Grid
router.get('/grid/get', sql.getAllPosts);
router.post('/grid/small/new', sql.postSmallPost);
router.post('/grid/large/new', sql.postLargePost);
router.delete('/grid/post', sql.deletePost);

// ! Users
router.post('/user/get/team', sql.getUsersTeam);
router.post('/user/edit', sql.editUser);

module.exports = router;