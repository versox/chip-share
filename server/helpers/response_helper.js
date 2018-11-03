exports.sendJson = (res, jsonObj) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(jsonObj));
};