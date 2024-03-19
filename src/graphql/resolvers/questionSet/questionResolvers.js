const fs = require('fs');
const path = require('path');

const getQuestions = () => {
  const questionsFilePath = path.join(__dirname, 'questions.json');
  const questionsData = fs.readFileSync(questionsFilePath, 'utf8');
  console.log(JSON.parse(questionsData));
  return JSON.parse(questionsData);
};

const getQuestionsResolver = () => {
  try {
    const questions = getQuestions();
    return questions;
  } catch (error) {
    console.error('Error retrieving questions:', error);
    throw new Error('Error retrieving questions');
  }
};

module.exports = {
  getQuestions: getQuestionsResolver,
};
