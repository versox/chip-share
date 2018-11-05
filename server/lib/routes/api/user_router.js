const express = require('express');
const router = express.Router({});
const authTokenHandler = require('../../../bin/auth_token_handler');
const User = require('../../models/User');
const createError = require('http-errors');

router.get('/check-login', authTokenHandler.check, async (req, res) => {
	res.send(await req.getUser());
});
router.post('/login', (req, res, next) => {
	User.findOne({username: req.body.username}, async (err, user) => {
		if (err)
			return next(createError(500, 'database error'));
		if (!user || await !user.checkPassword(req.body.password))
			return next(createError(401, 'invalid username or password'));
		const token = await authTokenHandler.createToken(user.id);
		res.status(200).send({token: 'Bearer '+token});
	});
});
router.post('/register', (req, res) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password // will be hashed pre-save
	});
	user.save((err) => {
		if (err) {
			res.status(400).send({errors: err.errors});
		} else {
			res.status(201).end();
		}
	});
});

module.exports = router;