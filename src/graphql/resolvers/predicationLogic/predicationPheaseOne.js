const User = require('../../models/User');
const PsychologyScalePrediction = require('../../models/PsychologyScalePrediction');
// const predictPsychologyScale = async (_, { answers }) => {
//     try {
//       const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
//       const averageScore = totalScore / answers.length;
//       return { score: averageScore };
//     } catch (error) {
//       console.error('Error predicting psychology scale:', error);
//       throw new Error('Error predicting psychology scale');
//     }
//   };

const getPsychologyScalePredictions = async (_, { userId }) => {
    try {
      const predictions = await PsychologyScalePrediction.find({ userId });
      return predictions;
    } catch (error) {
      console.error('Error fetching psychology scale predictions:', error);
      throw new Error('Error fetching psychology scale predictions');
    }
  };

const predictPsychologyScale = async (_, { userId, answers }) => {
    try {
        const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
        const averageScore = totalScore / answers.length;

        // Update the user's score in the database
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { score: averageScore, answers } },
          { new: true }
        );

        // Create a new psychology scale prediction entry
        const prediction = new PsychologyScalePrediction({
          userId: updatedUser.id,
          answers,
          score: averageScore,
          timestamp: new Date().toISOString() // Add a proper timestamp logic here
        });

        await prediction.save();

        return prediction;
      }catch (error) {
      console.error('Error predicting psychology scale:', error);
      throw new Error('Error predicting psychology scale');
    }
  };
  
  module.exports = {
    predictPsychologyScale,
    getPsychologyScalePredictions,
  };
  