const express = require('express');
const app = express();

// An array containing a list of song objects.
var songs = [
    {
	name: "Paranoid Android",
	author: "Thom Yorke",
	username: "Radiohead",
	createDate: "May 26 1997"
    },
    {
	name: "Hey Jude",
	author: "Paul McCartney",
	username: "The Beatles",
	createDate: "August 26 1968"
    }
    // we would put more songs here
    /* on the actual site we use a database
       and handle adding songs dynamically */
]

app.get("/api/songs",
    (req, res) => {
	// send the songs as JSON
	res.json(songs);
    }
);

app.listen(3300);
