const settings = require('../settings.json');
const dbUrl = settings.databaseUrl || 'mongodb://localhost/chip-store';
const MongoClient = require('mongodb').MongoClient;
exports.createSessionStore = (session) => {
	const MongoStore = require('connect-mongo')(session);
	return new MongoStore({
		url: dbUrl
	});
};
exports.getConnection = () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(dbUrl, (err, client) => {
			if (err)
				reject(err);
			else
				resolve(client);
		});
	});
};