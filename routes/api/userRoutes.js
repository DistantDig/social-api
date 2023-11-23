const router = require('express').Router();
const {
    getUsers,
    getUserByID,
    createUser,
    deleteUser
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userID')
    .get(getUserByID)
    .delete(deleteUser);