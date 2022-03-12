const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const UserSchema = new Schema(
    {
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
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friends) => total + friends.replies.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User;