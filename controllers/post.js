const mongoose = require("mongoose");

const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  getPosts: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email }).populate("posts");
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ posts: user.posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  post: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const currentdate = new Date();
      const date =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear();

      const time = currentdate.getHours() + ":" + currentdate.getMinutes();

      const newPost = new Post({
        ...req.body,
        dateCreated: date,
        timeCreated: time,
      });
      await newPost.save();

      await User.findOneAndUpdate({ email }, { $push: { posts: newPost._id } });

      res.status(200).json({ newPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePost: async (req, res) => {
    const { email, id } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      const updatedPost = await post.updateOne(req.body, { new: true });

      res.status(200).json({ updatedPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePost: async (req, res) => {
    const { email, id } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      await user.updateOne({ $pull: { posts: post._id } });

      await post.delete();

      res.status(200).json({ message: "Post is deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
