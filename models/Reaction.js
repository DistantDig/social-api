const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');
const formatTime = require('../utils/util');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            get: formatTime,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;