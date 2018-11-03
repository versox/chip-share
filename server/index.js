const app = require('./app');
const server = app.listen(3300, "localhost");
server.on('listening', () => {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.log('Listening on ' + bind);
});