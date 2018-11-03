var express = require("express");

var app = express();

app.get("/", function(req, res) {
    res.send("hi");
});

app.listen(3300, "localhost", null, function() { console.log("Server started!") });
