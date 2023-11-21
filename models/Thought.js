const { Schema, model } = require('mongoose');
const formatTimeStamp = require('../utils/util');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            get: formatTimeStamp,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;