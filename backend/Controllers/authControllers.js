const jwt = require('jsonwebtoken');
const User= require('../models/Schema');

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    // Basic validations
    if (!username || !email || !password || password !== confirmPassword) {
      return res.status(400).json({ error: 'Invalid input or passwords do not match' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



// In your authControllers.js or wherever your login controller is:

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;  // use email here
    const user = await User.findOne({ email });  // find user by email
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};



// exports.dashboard = (req, res) => {
//   res.json({ message: `Welcome, ${req.user.username}` });
// }// authControllers.js (add this)
exports.dashboard = async (req, res) => {
  try {
    const user = req.user;

    // You can fetch hyperlocal news here based on user's location, preferences, etc.
    // For example, if user has a `location` field:
    // const news = await News.find({ location: user.location });

    // For now, return user info and dummy news
    const news = [
      { id: 1, title: 'Local News 1', content: 'News content 1' },
      { id: 2, title: 'Local News 2', content: 'News content 2' },
    ];

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        location: user.location || 'Not specified',
      },
      news,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
