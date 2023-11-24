const { Schema, Types } = require('mongoose');
const formatTimeStamp = require('../utils/util');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
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
            get: formatTimeStamp,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;