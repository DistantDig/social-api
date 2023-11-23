const { Thought } = require('../models');

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
            const thoughts = await Thought.create(req.body);
            res.json(thoughts);
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

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}