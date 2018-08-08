const express = require('express');
const router = express.Router();

const auth = require('./auth');
const comment = require('./comment');
const post = require('./post');

router.use('/users', auth);

router.use('/post', post);

router.use('/comment', comment);

module.exports = router;