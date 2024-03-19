const userResolvers = require('./userResolvers');
const authResolvers = require('./authResolvers');
const { loginUser } = require('./authResolver');
const { getQuestions } = require('./questionSet/questionResolvers');
// const {predictPsychologyScale , getPsychologyScalePredictions } = require('./predicationLogic/predicationPheaseOne')

const resolvers = {
  Query: {
    getUser: userResolvers.getUser,
    getUsers: userResolvers.getUsers,
    getQuestions: getQuestions,
    // getPsychologyScalePredictions,
    // Other queries...
  },
  Mutation: {
    loginUser,
    // predictPsychologyScale,
    ...authResolvers,
    // Other mutations...
  },
};

module.exports = resolvers;



