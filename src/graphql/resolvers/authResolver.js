const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utils/validation');
const { encrypt } = require('../../utils/encryption');
const Counter = require('../models/Counter');

const loginUser = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    const token = createToken(user);
    return {
      user,
      token,
    };
  } catch (error) {
    throw new Error('Error during login');
  }
};
module.exports = {
  loginUser,
};
