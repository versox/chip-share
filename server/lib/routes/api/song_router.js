const express = require('express');
const router = express.Router({});
const authTokenHandler = require('../../../bin/auth_token_handler');
const Song = require('../../schemas/models/Song');
const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res, next) => {
	const conditions = {};
	if (req.query.userId) {
		try {
			conditions.userId = new ObjectId(req.query.userId);
		} catch (e) {
			return next(createError(400, 'invalid user id'));
		}
	}
	Song.find(conditions, '-instruments -blocks', async function(err, songs) {
		if (err) return next(createError(500, 'database error occurred while fetching songs'));
		const resultArray = [];
		for (const i in songs) {
			const song = songs[i];
			resultArray.push(await song.getFormattedObject());
		}
		res.send(resultArray);
	});
});
router.get('/:songId/:format?', (req, res, next) => {
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
		res.send(await song.getFormattedObject());
	});
});
router.post('/create', authTokenHandler.check, (req, res, next) => {
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
router.post('/update/:songId', authTokenHandler.check, (req, res, next) => {
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
		if (song.userId !== req.user.id) return next(createError(403, 'you cannot edit this song'));
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
router.delete('/:songId', authTokenHandler.check, (req, res, next) => {
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

module.exports = router;