const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;