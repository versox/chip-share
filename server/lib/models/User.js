const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: [true, 'That username is already taken.']
	},
	password: {
		type: String,
		required: true,
		validate: function(value) {
			return new Promise(function(resolve) {
				if (value.length < 8)
					return resolve(false, 'Password must be at least 8 characters in length.');
				resolve(true);
			});
		}
	}
});
// hash password post validate (pre save)
schema.post('validate', function(next) {
	const user = this;
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
	return new Promise(function(resolve, reject) {
		bcrypt.compare(test, this.password, function(err, res) {
			if (err)
				reject(err);
			else
				resolve(res);
		});
	});
};
module.exports = mongoose.model('User', schema);