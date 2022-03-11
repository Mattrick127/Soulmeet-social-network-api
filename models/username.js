const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: 'Username is Required!',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is Required!',
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: {

    },
    friends: {

    }
});

const User = model('User', UserSchema);

module.exports = User;