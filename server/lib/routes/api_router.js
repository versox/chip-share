const express = require('express');
const router = express.Router({});
const createError = require('http-errors');

router.use('/user', require('./api/user_router'));
router.use('/songs', require('./api/song_router'));

// api 404 handler
router.use(function(req, res, next) {
	next(createError(404, "no matching API request"));
});

module.exports = router;