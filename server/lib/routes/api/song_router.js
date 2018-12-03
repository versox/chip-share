const express = require('express');
const router = express.Router({});
const authTokenHandler = require('../../../bin/auth_token_handler');
const Song = require('../../schemas/models/Song');
const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const songResponseLimit = 10;

router.get('/', authTokenHandler.parse(false), (req, res, next) => {
	const conditions = {};
	if (req.query.userId) {
		try {
			conditions.userId = new ObjectId(req.query.userId);
		} catch (e) {
			return next(createError(400, 'invalid user id'));
		}
	}
	let delimiterId = null;
	if (req.query.delimiterId) {
		try {
			delimiterId = new ObjectId(req.query.delimiterId);
			conditions._id = {$lte: new ObjectId(req.query.delimiterId)};
		} catch (e) {
			return next(createError(400, 'invalid song delimiter id'));
		}
	}
	const sendResponse = async (songs, newDelimiter = null) => {
		const resultArray = [];
		for (const i in songs) {
			const song = songs[i];
			if (i >= songResponseLimit) {
				resultArray.push({delimiterId: song.id});
			} else {
				resultArray.push(await song.getFormattedObject(req.user ? req.user.id : null));
			}
		}
		if (newDelimiter && songs.length === songResponseLimit)
			resultArray.push({delimiterId: newDelimiter});
		res.send(resultArray);
	};
	if (req.query.popular === '1') {
		Song.find({}, '_id', {sort: '-score -createDate'}, function(err, songs) {
			if (err) return next(createError(500, 'database error occurred while organizing songs'));
			let ids = [];
			let newDelimiter = null;
			for (const i in songs) {
				const song = songs[i];
				if (ids.length === 0) {
					if (!delimiterId || song._id.equals(delimiterId)) {
						ids.push(song.id);
					}
				} else if (ids.length < songResponseLimit) {
					ids.push(song.id);
				} else {
					newDelimiter = song.id;
					break;
				}
			}
			Song.find({_id: {$in: ids}}, '-instruments -blocks', {sort: '-score -createDate'}, async function(err, songs) {
				if (err) return next(createError(500, 'database error occurred while fetching songs'));
				sendResponse(songs, newDelimiter);
			});
		});
	} else {
		const options = {
			limit: songResponseLimit+1,
			sort: '-createDate'
		};
		Song.find(conditions, '-instruments -blocks', options, async function(err, songs) {
			if (err) return next(createError(500, 'database error occurred while fetching songs'));
			sendResponse(songs);
		});
	}
});
router.get('/:songId/:format?', authTokenHandler.parse(false), (req, res, next) => {
	let selector = null;
	switch (req.params.format ? req.params.format.toLowerCase() : '') {
		case 'composition':
			selector = 'instruments blocks';
			break;
		case 'full':
			selector = null;
			break;
		default:
			return next(createError(400, 'invalid song format'));
	}
	let id;
	try {
		id = new ObjectId(req.params.songId);
	} catch (e) {
		return next(createError(400, 'invalid song id'));
	}
	Song.findById(id, selector, async function(err, song) {
		if (err) return next(createError(500, 'database error occurred while fetching song'));
		if (!song) return next(createError(404, 'song with that id does not exist'));
		res.send(await song.getFormattedObject(req.user ? req.user.id : null));
	});
});
router.post('/create', authTokenHandler.parse(), (req, res, next) => {
	// remove data that should not be provided
	delete req.body._id;
	delete req.body.ratings;
	delete req.body.createDate;
	delete req.body.updateDate;
	// set user id
	req.body.userId = req.user.id;
	// create song
	const song = new Song(req.body);
	song.save(err => {
		if (err != null) {
			if (err.name === 'ValidationError') {
				const errorMessages = {};
				for (const errorKey in err.errors)
					errorMessages[errorKey] = err.errors[errorKey].message;
				res.status(400).send({fieldErrors: errorMessages});
			} else {
				console.log(err);
				next(createError(500, 'an error occurred while attempting to save song'));
			}
		} else {
			res.status(200).send({id: song.id});
		}
	});
});
router.post('/update/:songId', authTokenHandler.parse(), (req, res, next) => {
	// remove data that should not be provided
	delete req.body._id;
	delete req.body.userId; // userId stays constant
	delete req.body.ratings;
	delete req.body.createDate;
	delete req.body.updateDate;
	let id;
	try {
		id = new ObjectId(req.params.songId);
	} catch (e) {
		return next(createError(400, 'invalid song id'));
	}
	Song.findOne({_id: id}, 'userId' , async function(err, song) {
		if (err) return next(createError(500, 'database error occurred while fetching song'));
		if (!song) return next(createError(404, 'song with that id does not exist'));
		if (!song.userId.equals(req.user.id)) return next(createError(403, 'you cannot edit this song'));
		song.set(req.body); // update
		song.updateDate = Date.now(); // set update date
		song.save(err => {
			if (err != null) {
				if (err.name === 'ValidationError') {
					const errorMessages = {};
					for (const errorKey in err.errors)
						errorMessages[errorKey] = err.errors[errorKey].message;
					res.status(400).send({fieldErrors: errorMessages});
				} else {
					console.log(err);
					next(createError(500, 'an error occurred while attempting to update song'));
				}
			} else {
				res.status(200).end();
			}
		});
	});
});
router.delete('/:songId', authTokenHandler.parse(), (req, res, next) => {
	let id;
	try {
		id = new ObjectId(req.params.songId);
	} catch (e) {
		return next(createError(400, 'invalid song id'));
	}
	Song.deleteOne({_id: id, userId: req.user.id}, (err, info) => {
		if (err) return next(createError(500, 'database error occurred while deleting song'));
		if (info && info.hasOwnProperty('n') && info.n === 0) return next(createError(400, 'song could not be deleted'));
		res.status(200).end();
	});
});
router.post('/rate/:songId/:rating?', authTokenHandler.parse(), (req, res, next) => {
	try {
		id = new ObjectId(req.params.songId);
	} catch (e) {
		return next(createError(400, 'invalid song id'));
	}
	let rating = null;
	if (req.params.hasOwnProperty('rating') && req.params.rating) {
		if (/^[1-5]$/.test(req.params.rating)) {
			rating = parseInt(req.params.rating);
		} else {
			return next(createError(400, 'invalid rating'));
		}
	}
	Song.findOne({_id: id}, 'ratings' , async function(err, song) {
		if (err) return next(createError(500, 'database error occurred while fetching song'));
		if (!song) return next(createError(404, 'song with that id does not exist'));
		let keyOfCurrentRating = -1;
		for (const i of song.ratings.keys()) {
			const rating = song.ratings[i];
			if (rating.userId.equals(req.user.id)) {
				keyOfCurrentRating = i;
				break;
			}
		}
		let save = false;
		if (rating == null) {
			if (keyOfCurrentRating >= 0) {
				song.ratings.splice(keyOfCurrentRating, 1);
				save = true;
			}
		} else {
			if (keyOfCurrentRating >= 0) {
				if (song.ratings[keyOfCurrentRating].rating !== rating) {
					song.ratings[keyOfCurrentRating].rating = rating;
					save = true;
				}
			} else {
				song.ratings.push({
					userId: req.user.id,
					rating: rating
				});
				save = true;
			}
		}
		if (save) {
			song.save(err => {
				if (err) return next(createError(500, 'unknown error occurred while updating rating'));
				res.status(200).end();
			});
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;