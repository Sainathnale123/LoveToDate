// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ProjectBackend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));
