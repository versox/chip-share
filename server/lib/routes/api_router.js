const express = require('express');
const router = express.Router({});

router.use('/user', require('./api/user_router'));

module.exports = router;