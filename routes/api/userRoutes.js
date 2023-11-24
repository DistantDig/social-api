const router = require('express').Router();
const {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userID')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userID/friends/:friendID')
    .post(addFriend)
    .delete(removeFriend);

    module.exports = router;