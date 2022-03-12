const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
        },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const reactionSchema = new Schema(
    {
        
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;