const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers (req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one user by id
    async getUserByID (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userID })
            .select('__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates a new user
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a user by id
    async deleteUser (req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userID });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Adds a friend to a user
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendID });

            if (!friend) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $addToSet: { friends: friend._id } },
                { runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ messgae: 'No user found with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Removes a friend from a user
    async removeFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendID });

            if (!friend) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $pull: { friends: friend._id } },
                {runValidators: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}