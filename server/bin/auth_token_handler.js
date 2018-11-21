const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const secret = process.env.CHIP_SHARE_SECRET || '&$j#*GrqkAa2S|P:Xur26rWI^XOtao';
const User = require('../lib/schemas/models/User');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
exports.parse = function(required = true) {
	return function(req, res, next) {
		let token = req.header('Authorization');
		if (!token)
			return required ? next(createError(401, 'authorization token required')) : next();
		if (!token.startsWith('Bearer '))
			return required ? next(createError(401, 'invalid authorization type')) : next();
		token = token.substring(7);
		jwt.verify(token, secret, function(err, decoded) {
			if (err)
				return required ? next(createError(401, 'invalid authorization token')) : next();
			else {
				User.findById(decoded.id, function (err, user) {
					if (err) return required ? next(createError(500, 'database error (fetch user)')) : next();
					if (user == null) return required ? next(createError(401, 'invalid authorization token')) : next();
					req.user = user;
					req.tokenRefreshSecret = decoded.hs;
					next();
				});
			}
		});
	};
};
exports.createToken = function(userId) {
	return new Promise(function(resolve, reject) {
		const refreshSecret = uuidv4();
		bcrypt.genSalt(10, function(err, salt) {
			if (err) return reject(err);
			bcrypt.hash(refreshSecret, salt, function(err, hashedSecret) {
				if (err) return reject(err);
				jwt.sign({ id: userId, hs: hashedSecret }, secret, { expiresIn: '30m' }, function(err, token) {
					if (err)
						reject(err);
					else
						resolve([token, refreshSecret]);
				});
			});
		});
	});
};