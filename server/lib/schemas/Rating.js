const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const schema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	}
}, { _id: false });
module.exports = schema; // sub document