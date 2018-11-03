const express = require("express");
const app = express();
const session = require('express-session');
const mongoHelper = require('./helpers/mongo_helper');

app.use(express.json());
app.use(session({
	name: 'chip-share-session',
	secret: 'oh8w4kfr84e',
	unset: 'destroy',
	store: mongoHelper.createSessionStore(session),
	resave: false,
	saveUninitialized: false
}));
app.use(require('./helpers/session_helper'));

// routing
app.use("/api", require("./routes/api_router"));

// handle errors
require('./helpers/error_handler')(app);

module.exports = app;