const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		match: [/^[a-z\- ]{3,}$/i, 'Invalid name.']
	},
	username: {
		type: String,
		required: true,
		minlength: [5, 'Username must be at least 5 characters long.'],
		maxlength: [16, 'Username cannot be longer than 16 characters.'],
		lowercase: true,
		match: [/^[a-z0-9_]*$/i, 'Username can only contain alpha-numeric characters and underscores.'],
		unique: [true, 'That username is already taken.']
	},
	password: {
		type: String,
		required: true,
		validate: {
			isAsync: true,
			validator: function(value, callback) {
				if (value.length < 8)
					return callback(false, 'Password must be at least 8 characters in length.');
				callback(true);
			}
		}
	}
});
// hash password post validate (pre save)
schema.pre('save', async function(next) {
	const user = this;
	if (!user.isModified('password')) return next();
	user.password = await bcrypt.hash(user.password, 10);
	next();
});
// custom method for checking the password
schema.methods.checkPassword = function(test) {
	return bcrypt.compare(test, this.password);
};
schema.methods.toFormattedObject = function(hidePassword = true) {
	return this.toObject({
		versionKey: false,
		transform: (user, output) => {
			if (hidePassword)
				delete output.password;
			output.id = output._id;
			delete output._id;
		}
	});
};
module.exports = mongoose.model('User', schema);