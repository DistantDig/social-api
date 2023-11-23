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
            const users = await User.findOne({ _id: req.params.userID })
            .select('__v');

            if (!users) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates a new user
    async createUser (req, res) {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a user by id
    async deleteUser (req, res) {
        try {
            const users = await User.findOneAndDelete({ _id: req.params.userID });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}