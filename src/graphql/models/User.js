// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  psychologyScore: Number,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
