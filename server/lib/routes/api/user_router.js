const express = require('express');
const router = express.Router({});
const authTokenHandler = require('../../../bin/auth_token_handler');
const User = require('../../schemas/models/User');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

router.get('/account-info', authTokenHandler.check, (req, res) => {
	res.send(req.user.toFormattedObject());
});
router.post('/login', (req, res, next) => {
	try {
		User.findOne({username: req.body.username}, async (err, user) => {
			if (err)
				return next(createError(500, 'database error'));
			if (!user || !(await user.checkPassword(req.body.password)))
				return next(createError(401, 'invalid username or password'));
			const [token, refreshSecret] = await authTokenHandler.createToken(user.id);
			res.status(200).send({token: 'Bearer '+token, refreshSecret: refreshSecret});
		});
	} catch (e) { // mainly for bcrypt, in case it throws errors
		console.log(e);
		next(createError(500, 'server error'));
	}
});
router.post('/refresh-access', authTokenHandler.check, async (req, res, next) => {
	try {
		if (req.body.refreshSecret && req.tokenRefreshSecret && await bcrypt.compare(req.body.refreshSecret, req.tokenRefreshSecret)) {
			const [token, refreshSecret] = await authTokenHandler.createToken(req.user.id);
			res.status(200).send({token: 'Bearer '+token, refreshSecret: refreshSecret});
		} else {
			next(createError(401, 'refresh unauthorized'));
		}
	} catch (e) { // mainly for bcrypt, in case it throws errors
		console.log(e);
		next(createError(500, 'server error'));
	}
});
router.post('/register', (req, res) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password // will be hashed pre-save
	});
	user.save((err) => {
		if (err) {
			const errorMessages = {};
			if (err.message.indexOf('duplicate key error') !== -1) {
				errorMessages.username = 'Username already taken.';
			} else {
				for (const errorKey in err.errors) {
					errorMessages[errorKey] = err.errors[errorKey].message;
				}
			}
			res.status(400).send({fieldErrors: errorMessages});
		} else {
			res.status(201).end();
		}
	});
});
router.post('/delete-account', authTokenHandler.check, (req, res, next) => {
	User.deleteOne({_id: req.user._id}, (err) => {
		if (err) return next(createError(500, 'database error'));
		res.status(200).end();
	});
});

module.exports = router;