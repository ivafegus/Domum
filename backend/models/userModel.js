const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Adds unique: [true/false] to values
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true,
        unique: true
    },

    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

	admin: {
		type: Boolean,
		default: false
	}
})

// When logging in, the password needs to be hashed, so it can be compared to the one in the database
userSchema.statics.authenticate = function(username, password, callback) {
	User.findOne({username: username}).exec(function(err, user) {
		if (err) {
			return callback(err);
		} else if (!user) {
			var err = new Error("User not found!");
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if(result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
}

// Before save is ran, it encrypts the password, so a hashed password is saved instead
userSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
})

userSchema.plugin(uniqueValidator, {message: 'is not unique.'});

var User = mongoose.model('User', userSchema);
module.exports = User