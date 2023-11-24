const { Thought } = require('../models');

module.exports = {
    // Creates a new reaction
    async createReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtID},
                { $addToSet: { reactions: req.body } },
                { runValidators: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a reaction by id
    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtID},
                { $pull: { reactions: { reactionID: req.params.reactionID } } },
                { runValidators: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}