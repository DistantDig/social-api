const router = require('express').Router();
const {
    getThoughts,
    getThoughtByID,
    createThought,
    deleteThought
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtID')
    .get(getThoughtByID)
    .delete(deleteThought);

    module.exports = router;