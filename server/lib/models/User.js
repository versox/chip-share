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
schema.post('validate', function(user, next) {
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});
// custom method for checking the password
schema.methods.checkPassword = function(test) {
	return bcrypt.compare(test, this.password);
};
module.exports = mongoose.model('User', schema);