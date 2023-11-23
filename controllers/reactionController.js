const { Reaction } = require('../models');

module.exports = {
    // Get all reactions
    async getReactions (req, res) {
        try {
            const reactions = await Reaction.find();
            res.json(reactions);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one reaction by id
    async getReactionByID (req, res) {
        try {
            const reaction = await Reaction.findOne({ _id: req.params.reactionID })
            .select('__v');

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with that ID'});
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates a new reaction
    async createReaction (req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a reaction by id
    async deleteReaction (req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionID });

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with that ID'});
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}