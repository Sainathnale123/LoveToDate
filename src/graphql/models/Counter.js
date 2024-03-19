// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  model: String,
  field: String,
  count: Number,
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
