const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ tid: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No thought with that ID." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { uuid: req.body.userId },
        { $addToSet: { thoughts: thought.tid } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Ruh roh, Raggy!  You forgot the user ID.",
        });
      }

      res.json("Your thought has been thought out loud!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { tid: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No thought with that ID." });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        tid: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No thought with that ID." });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No user with that ID." });
      }

      res.json({ message: "Thought successfully unthought." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { tid: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No thought with that ID." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { tid: req.params.thoughtId, "reactions.rid": req.params.reactionId },
        { $set: { "reactions.$": req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy! No thought with that ID." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { tid: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy! No thought with that ID." });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
