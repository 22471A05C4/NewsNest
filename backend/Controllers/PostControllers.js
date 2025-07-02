const User = require('../models/Post');

exports.createNews = async (req, res) => {
  try {
    const { heading, newscontent,  category } = req.body;
    const filePath = req.file ? req.file.path : null;

    const user = new User({
      heading,
      newscontent,
       category,
      filePath,
    });

    await user.save();
    res.status(200).send('Success');
  } catch (err) {
    console.error('Error in uploading:', err);
    res.status(400).send('Error in uploading');
  }
};

exports.getNews = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};