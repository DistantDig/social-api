const router = require('express').Router();
const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtID')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought);

    module.exports = router;