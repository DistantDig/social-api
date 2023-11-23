const router = require('express').Router();
const {
    getReactions,
    getReactionByID,
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
    .get(getReactions)
    .post(createReaction);

router.route('/:reactionID')
    .get(getReactionByID)
    .delete(deleteReaction);