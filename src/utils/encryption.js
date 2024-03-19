// utils/encryption.js
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

module.exports = { encrypt };
