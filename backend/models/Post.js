const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  heading: String,
  newscontent: String,
  category: String,
  filePath: String,
});

module.exports = mongoose.model('User', userSchema);