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
      const thought = await Thought.findOne({ _id: req.params._id });

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
        { _id: req.body._id },
        { $addToSet: { thoughts: thought._id } },
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
        { _id: req.params._id },
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
        _id: req.params._id,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No thought with that ID." });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params._id },
        { $pull: { thoughts: req.params._id } },
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
        { _id: req.params._id },
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
        { _id: req.params._id, "reactions._id": req.params.reactionId }, 
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
  
  async removeThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { reactions: { _id: req.params.reactionId } } }, 
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