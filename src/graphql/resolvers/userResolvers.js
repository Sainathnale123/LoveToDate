const User = require('../models/User');
const Counter = require('../models/Counter');
const { encrypt } = require('../../utils/encryption');
const { createToken } = require('../../utils/validation');
const { authenticateUser } = require('./authMiddleware');

const getUser = authenticateUser(async (_, { id }) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
});

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};

// Other user-related resolvers...

module.exports = {
  getUser,
  getUsers,
  // Export other user resolvers here...
};
