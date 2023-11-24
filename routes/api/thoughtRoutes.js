const router = require('express').Router();
const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');
const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtID')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtID/reactions')
    .post(createReaction);
    
router.route('/:thoughtID/reactions/:reactionID')
    .delete(deleteReaction);

module.exports = router;