const mongoose = require('mongoose');

const psychologyScalePredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  answers: {
    type: [Number],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PsychologyScalePrediction = mongoose.model('PsychologyScalePrediction', psychologyScalePredictionSchema);

module.exports = PsychologyScalePrediction;
