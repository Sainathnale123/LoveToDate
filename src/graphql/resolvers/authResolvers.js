const User = require('../models/User');
const Counter = require('../models/Counter'); // Import the Counter model
const { encrypt } = require('../../utils/encryption');
const { createToken } = require('../../utils/validation');
const { authenticateUser } = require('./authMiddleware');

const registerUser = async (_, { username, email, password }) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { model: 'User', field: 'id' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const encryptedPassword = await encrypt(password);

    const user = new User({
      id: counter.count,
      username,
      email,
      password: encryptedPassword,
    });

    await user.save();

    const token = createToken(user);

    return { user, token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Error registering user');
  }
};

const deleteUser = authenticateUser(async (_, { id }) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
});

const updateUser = authenticateUser(async (_, { id, username, email, password }) => {
  try {
    const encryptedPassword = await encrypt(password);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { username, email, password: encryptedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
});

// const predictPsychologyScale = async (_, { answers }) => {
//   try {
//     const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
//     const averageScore = totalScore / answers.length;
//     return { score: averageScore };
//   } catch (error) {
//     console.error('Error predicting psychology scale:', error);
//     throw new Error('Error predicting psychology scale');
//   }
// };


const predictPsychologyScale = async (_, { id, answers }) => {
  try {
    const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
    const averageScore = totalScore / answers.length;

    // Update the user's psychologyScore field with the predicted averageScore
    console.log(averageScore);
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { psychologyScore: averageScore } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return { user, score: averageScore };
  } catch (error) {
    console.error('Error predicting psychology scale:', error);
    throw new Error('Error predicting psychology scale');
  }
};

// const predictPsychologyScale = authenticateUser(async (_, { answers }, context) => {
//   try {
//     const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
//     const averageScore = totalScore / answers.length;

//     // Update the user's psychologyScore field with the predicted averageScore
//     const updatedUser = await User.findByIdAndUpdate(
//       context.user.id, // Assuming the user's ID is available in the context
//       { $set: { psychologyScore: averageScore } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       throw new Error('User not found');
//     }

//     return { user: updatedUser, score: averageScore };
//   } catch (error) {
//     console.error('Error predicting psychology scale:', error);
//     throw new Error('Error predicting psychology scale');
//   }
// });

module.exports = {
  registerUser,
  deleteUser,
  updateUser,
  predictPsychologyScale,
};
