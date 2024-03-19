const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  "I enjoy socializing with others.",
  "I often feel anxious in new situations.",
  "I am confident in my abilities.",
  "I tend to be pessimistic about the future.",
  "I am usually calm under pressure."
];

function predictPsychologyScale(answers) {
  const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
  const averageScore = totalScore / answers.length;
  return averageScore;
}

function askQuestion(index) {
  if (index < questions.length) {
    rl.question(`${questions[index]} (1-5): `, (answer) => {
      if (parseInt(answer) >= 1 && parseInt(answer) <= 5) {
        answers.push(answer);
        askQuestion(index + 1);
      } else {
        console.log("Please provide a valid answer between 1 and 5.");
        askQuestion(index);
      }
    });
  } else {
    rl.close();
    const prediction = predictPsychologyScale(answers);
    console.log(`Predicted psychology scale score: ${prediction}`);
  }
}

const answers = [];
askQuestion(0);

module.exports = {
  askQuestion: askQuestion,
  rl: rl
};

