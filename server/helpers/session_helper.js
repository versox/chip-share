module.exports = function(req, res, next) {
	const loggedIn = req.session.hasOwnProperty('user') && req.session.user;
	req.user = loggedIn ? req.session.user : {};
	req.user.loggedIn = loggedIn;
	next();
};