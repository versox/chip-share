const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const settings = require('./lib/config/config');
mongoose.connect(settings.databaseUrl || 'mongodb://localhost/chip-share', { useNewUrlParser: true });

app.use(express.static("../client/build"));

app.use(express.json()); // only parse json input

// routing
app.use("/api", require("./lib/routes/api_router"));

// react routing
app.get('*', (req,res) =>{
    res.sendFile('client/build/index.html', { root: path.join('__dirname', '/../../')});
});

// handle errors
require('./bin/error_handler')(app);

module.exports = app;
