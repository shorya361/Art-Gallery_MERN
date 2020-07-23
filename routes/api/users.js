const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Posts = require('../../models/Posts');
const Comment = require('../../models/comments');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// GET api/users
// Public
// Register User
router.post(
  '/register',

  async (req, res) => {
    try {
      const { name, email, password, city, description } = req.body;
      const { AdminCode } = req.body;
      // See if the user exists.
      // console.log(req.body);

      // console.log('inside register backend: ', req.body);
      let user = await User.findOne({ email });
      if (user) {
        return res.json({ errors: { msg: ' This Email ID is not available' } });
      }
      var isAdmin = false;
      if (AdminCode == 'cloberine_time') {
        isAdmin = true;
      }
      user = new User({
        name,
        email,
        password,
        city,
        description,
        isAdmin,
      });
      // Encrypt User
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      // console.log(user);
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
      //      res.send('User registered. ');
    } catch (err) {
      console.log('error in registration :' + err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Deactivate Account
router.post('/changeStatus', async (req, res) => {
  try {
    const { Profile } = req.body;
    let user = await User.findById(Profile);
    // console.log(user);
    user.activated = !user.activated;
    await user.save();
    res.json({ user });
  } catch (error) {
    console.log('error in deativating :' + error.message);
    res.status(500).send('server error');
  }
});

//update Profile
router.put('/updateProfile', async (req, res) => {
  try {
    const { userId, name, description, city } = req.body;
    let user = await User.findById(userId);
    user.name = name;
    (user.description = description), (user.city = city);
    user.Posts.map(async (eachPost) => {
      let post = await Posts.findById(eachPost);
      post.author.username = name;
      await post.save();
    });
    user.comments.map(async (eachComment) => {
      let comment = await Comment.findById(eachComment);
      comment.author.username = name;
      await comment.save();
      // console.log(comment);
    });

    await user.save();
    res.json({ user });
  } catch (error) {
    console.log('error in updating :' + error.message);
  }
});

module.exports = router;
