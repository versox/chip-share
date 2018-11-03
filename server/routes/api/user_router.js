const express = require('express');
const router = express.Router({});

router.get('/:id([0-9]+)?', (req, res, next) => {
	// TODO
});
router.post('/login', (req, res, next) => {
	// TODO
});
router.post('/logout', (req, res, next) => {
	// TODO
});
router.post('/register', (req, res, next) => {
	// TODO
});

module.exports = router;