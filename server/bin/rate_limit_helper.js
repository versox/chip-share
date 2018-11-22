const createError = require('http-errors');

let apiLimit = (req, res, next) => next();
let clientLimit = (req, res, next) => next();

const handler = (req, res, next) => {
	next(createError(429, 'too many requests, try again later'));
};
if (process.env.NODE_ENV === 'production') {
	const rateLimit = require("express-rate-limit");
	apiLimit = rateLimit({
		windowMs: 5 * 60 * 1000, // 5 minutes
		max: 300, // limit of requests per windowMs
		handler: handler
	});
	clientLimit = rateLimit({
		windowMs: 5 * 60 * 1000, // 5 minutes
		max: 900, // limit of requests per windowMs
		handler: handler
	});
}
exports.apiLimit = apiLimit;
exports.clientLimit = clientLimit;