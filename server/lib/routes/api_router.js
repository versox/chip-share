const express = require('express');
const router = express.Router({});

router.use('/user', require('./api/user_router'));
router.use('/songs', require('./api/song_router'));

module.exports = router;