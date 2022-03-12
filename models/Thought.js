const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        },

    },
    {
        toJSON: {
            getters: true
        }
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;