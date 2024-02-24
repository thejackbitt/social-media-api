const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params._id }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No user with this ID." });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params._id });

        if (!user) {
            return res
            .status(404)
            .json({ message: "Ruh roh, Raggy!  No user with this ID." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No user with that ID."});
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async unFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: "Ruh roh, Raggy!  No user with that ID."});
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};