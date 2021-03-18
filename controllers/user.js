const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;
    try {
      const users = await User.find({ email });
      if (users.length > 0)
        return res.status(409).json({ message: "Email exist" });

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return res.status(500).json({ error: err.message });

        const newUser = new User({
          email,
          password: hash,
        });

        await newUser.save();

        const token = jwt.sign(
          {
            email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ message: "User created!", token, email });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  signIn: async (req, res) => {
    const { email } = req.body;
    try {
      const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Auth succeeded", token, email });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  savePost: async (req, res) => {
    const { email, post } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      await User.findOneAndUpdate(
        { email },
        {
          $push: { searches: post },
        }
      );
      res.status(200).json({ message: "Post was saved" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSearches: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      res.status(200).json({ searches: user.searches });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
