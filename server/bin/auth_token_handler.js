const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const secret = process.env.CHIP_SHARE_SECRET || '&$j#*GrqkAa2S|P:Xur26rWI^XOtao';
const User = require('../lib/models/User');
exports.check = function(req, res, next) {
	let token = req.headers['Authorization'];
	if (!token)
		return next(createError(401, 'authorization token required'));
	if (!token.startsWith('Bearer '))
		return next(createError(401, 'invalid authorization type'));
	token = token.substring(7);
	jwt.verify(token, secret, function(err, decoded) {
		if (err)
			return next(createError(401, 'invalid authorization token'));
		else {
			// async getter method
			req.getUser = function() {
				return new Promise(function(resolve, reject) {
					if (req.hasOwnProperty('user'))
						resolve(req.user);
					else {
						User.findById(decoded.id, function (err, user) {
							if (err) reject(err);
							req.user = user ? user : null;
							resolve(req.user);
						});
					}
				});
			};
			next();
		}
	});
};
exports.createToken = function(userId) {
	return new Promise(function(resolve, reject) {
		jwt.sign({ id: userId }, secret, { expiresIn: '1h' }, function(err, token) {
			if (err)
				reject(err);
			else
				resolve(token);
		});
	});
};