const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.get("/", function(req, res) {
	res.send("hi");
});

module.exports = app;