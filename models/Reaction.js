const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

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
            default: Date.now
        }
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;