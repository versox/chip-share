const createError = require('http-errors');
module.exports = (app) => {
	// 404 handler
	app.use(function(req, res, next) {
		next(createError(404, "not found"));
	});
	// error handler (4 parameters needed for express to recognize this as an error handler)
	app.use(function(err, req, res, next) {
		//console.error(err);
		res.status(err.status || 404).send({error: (err.status ? err.status+' ' : '')+err.message});
	});
};