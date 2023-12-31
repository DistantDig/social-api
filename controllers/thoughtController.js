const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one thought by id
    async getThoughtByID (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtID })
            .select('__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates a new thought
    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Updates an existing though
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtID },
                { $set: req.body },
                { runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a thought by id
    async deleteThought (req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtID },
                { $pull: { thoughts: req.params.thoughtID } },
                {runValidators: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}