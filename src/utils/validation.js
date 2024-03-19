// utils/validation.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MTA4NDMyMzUsImV4cCI6MTcxMDg0NjgzNX0.qG0mHyNFA9Rs8HvTB5GzANGCqd6wB7QERe6aWqEK9gA'; 

const createToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
};

console.log(createToken);
module.exports = { createToken };
