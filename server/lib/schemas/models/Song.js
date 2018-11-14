const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Rating = require('../Rating');
const totalPitches = 12;
const totalNotes = 16;
const noteEncodingFormat = 'base64'; // utf8 wont work, since it's multi-byte, ascii seem to work fine, but using base64 to be safe
const objectArrayTypeCheck = function(value) {
	// mongoose issue: setting value of sub-document arrays to false or 0 or [false] or [0] throws
	// ObjectParameterError: Parameter "obj" to Document() must be an object, got false
	// as a workaround, we explicitly only allow an array of objects here
	if (value.constructor !== Array)
		throw new Error();
	for (let i = 0; i < value.length; i++) {
		const item = value[i];
		if (typeof item !== 'object')
			throw new Error();
	}
	return value;
};
const User = require('./User');
const Block = new mongoose.Schema({
	data: {
		type: Object,
		validate: {
			validator: function(value) {
				// if (Buffer.isBuffer(value))
				// 	return true;
				const blockData = value;
				if (blockData.constructor !== Array)
					throw new Error('Pitch data must be an array.');
				if (blockData.length !== totalPitches)
					throw new Error('Pitch data must have ' + totalPitches + ' pitches (' + blockData.length + ' given).');
				for (let i = 0; i < blockData.length; i++) {
					const notes = blockData[i];
					if (notes.constructor !== Array)
						throw new Error('Note data must be an array (index ' + i + ').');
					if (notes.length !== totalNotes)
						throw new Error('Note data must have ' + totalNotes + ' notes (' + notes.length + ' given, index ' + i + ').');
					for (let j = 0; j < notes.length; j++) {
						const noteDuration = notes[j];
						if (!Number.isInteger(noteDuration))
							throw new Error('Note durations must be integers.');
						if (noteDuration < 0 || noteDuration > 15) {
							throw new Error('Note durations must be integers from 0-15, inclusive.');
						}
					}
				}
				const buffer = Buffer.alloc(3 + Math.ceil((totalPitches * totalNotes) / 2));
				let pointer = 0;
				buffer.writeUInt8(1, pointer++); // version 1, at first position
				buffer.writeUInt8(totalPitches, pointer++);
				buffer.writeUInt8(totalNotes, pointer++);
				let byte = 0;
				let halfWritten = false;
				for (let i = 0; i < blockData.length; i++) {
					const notes = blockData[i];
					for (let j = 0; j < notes.length; j++) {
						const noteDuration = notes[j];
						if (!halfWritten) {
							halfWritten = true;
							byte = (noteDuration & 0x0F) << 4;
						} else {
							byte |= noteDuration & 0x0F;
							buffer.writeUInt8(byte, pointer++);
							halfWritten = false;
						}
					}
				}
				// console.log(buffer.toJSON());
				// console.log(buffer.toString(noteEncodingFormat));
				// console.log(Buffer.from(buffer.toString(noteEncodingFormat), noteEncodingFormat).toJSON());
				this.data = buffer.toString(noteEncodingFormat);
				return true;
			}
		}
	}
}, { _id: false });
Block.methods.getParsedData = function() {
	const buffer = Buffer.from(this.data, noteEncodingFormat);
	let pointer = 0;
	const dataVersion = buffer.readUInt8(pointer++); // for future changes
	if (dataVersion === 1) {
		const pitches = buffer.readUInt8(pointer++);
		const notes = buffer.readUInt8(pointer++);
		const total = pitches*notes;
		const parsedData = [];
		let totalCounter = 0;
		let byte = 0;
		let halfRead = false;
		let currNoteArray;
		while (pointer <= buffer.length && totalCounter < total) {
			let noteDuration;
			if (!halfRead) {
				byte = buffer.readUInt8(pointer++);
				noteDuration = (byte >> 4) & 0x0F;
				halfRead = true;
			} else {
				noteDuration = byte & 0x0F;
				halfRead = false;
			}
			const noteIndex = totalCounter%notes;
			if (noteIndex === 0) {
				currNoteArray = [];
				parsedData.push(currNoteArray);
			}
			currNoteArray.push(noteDuration);
			totalCounter++;
		}
		return parsedData;
	} else {
		throw new Error('Unsupported data version '+dataVersion+"!");
	}
};
const Instrument = new mongoose.Schema({
	settings: {
		type: new mongoose.Schema({
			typeId: {
				type: Number,
				required: true,
				match: [/^\d$/, 'Instrument type id must be a single integer (0-9).']
			},
			metadata: {
				type: String,
				required: true,
				validate: {
					validator: function(value) {
						return /\d{3}[a-z0-9]{2}/.test(value);
					},
					message: 'Metadata must be a string consisting of 3 integers followed by 2 characters.'
				}
			}
		}, { _id: false }),
		required: true
	},
	blocks: {
		type: [Number],
		required: true,
		validate: {
			validator: function(value) {
				if (value.length !== 8)
					throw new Error('There must be 8 total block ids per instrument (use null for empty blocks).');
				value.every(function(blockId) {
					if (blockId == null)
						return true;
					if (blockId < 1 || blockId > 32)
						throw new Error('Block ids must range from 1-32, inclusive.');
					return true;
				});
				return true;
			}
		}
	}
}, { _id: false });
const Song = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	userId: {
		type: ObjectId,
		required: true,
		index: true, // to optimise fetching songs by users
		validate: {
			isAsync: true,
			validator: function(value, callback) {
				User.findById(value, function(err, user) {
					if (err) return callback(false, 'Failed to retrieve user.');
					callback(!!user, 'Could not find user with that id.');
				});
			}
		}
	},
	blockLength: {
		type: Number,
		required: true,
		min: 1,
		max: 8
	},
	bpm: {
		type: Number,
		required: true,
		min: 1,
		max: 500
	},
	instruments: {
		type: [Instrument],
		required: true,
		set: objectArrayTypeCheck,
		validate: {
			validator: function(value) {
				if (value.length > 4)
					throw new Error('There cannot be more than 4 instruments.');
				return true;
			}
		}
	},
	blocks: {
		type: Map,
		of: Block,
		required: true,
		validate: {
			validator: function(value) {
				if (value == null || typeof value !== 'object')
					throw new Error('Given value is not an object.');
				const keys = Array.from(value.keys());
				if (keys.length === 0)
					throw new Error('At least one block must be specified.');
				if (keys.length > 32)
					throw new Error('There cannot be more than 32 blocks.');
				const ids = [];
				keys.every(function(rawId) {
					const parsedId = parseInt(rawId);
					if (isNaN(parsedId))
						throw new Error('Block key must be an integer.');
					if (parsedId < 1 || parsedId > 32)
						throw new Error('Block ids must range from 1-32, inclusive.');
					if (ids.includes(parsedId))
						throw new Error('Duplicate block id '+parsedId+'.');
					ids.push(parsedId);
					const block = value.get(rawId);
					if (block == null)
						throw new Error('Blocks cannot be null.');
					return true;
				});
				return true;
			}
		}
	},
	ratings: {
		type: [Rating],
		default: []
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date,
		default: null
	}
});
Song.methods.getUser = function() {
	const id = this.userId;
	return new Promise(resolve => {
		User.findOne({_id: id}, function(err, user) {
			if (err || !user)
				resolve(null);
			else
				resolve(user.toFormattedObject());
		});
	});
};
Song.methods.getFormattedObject = function() {
	const song = this;
	return new Promise(async resolve => {
		const result = song.toObject({versionKey: false});
		delete result.userId;
		if (result.hasOwnProperty('user')) {
			result.user = await song.getUser();
		}
		if (result.hasOwnProperty('blocks')) {
			const parsedBlocks = {};
			for (const [key, block] of song.blocks.entries()) {
				parsedBlocks[key] = block.getParsedData();
			}
			result.blocks = parsedBlocks;
		}
		result.id = result._id;
		delete result._id;
		resolve(result);
	});
};
Song.pre('save', function() {
	this.updateDate = Date.now();
});
module.exports = mongoose.model('Song', Song);