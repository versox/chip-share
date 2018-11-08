const app = require('./app');
const server = app.listen(parseInt(process.env.CHIP_SHARE_PORT || '3300', 10), "localhost");
server.on('listening', () => {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.log('Listening on ' + bind);
});