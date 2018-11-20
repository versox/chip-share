const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const settings = require('./lib/config/config');
mongoose.connect(settings.databaseUrl || 'mongodb://localhost/chip-share', { useNewUrlParser: true });

app.use(express.json()); // only parse json input

// routing
app.use('/api', require('./lib/routes/api_router'));

const clientBuildDir = path.resolve(__dirname, '../client/build');
app.use(express.static(clientBuildDir));
app.get('*', (req, res) => {
	res.sendFile('index.html', { root: clientBuildDir});
});

// handle errors
require('./bin/error_handler')(app);

module.exports = app;
