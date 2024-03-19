const { AuthenticationError } = require('apollo-server');

const authenticateUser = (resolverFunction) => async (parent, args, context, info) => {
  try {
    // Check if the resolver's name is predictPsychologyScale
    if (info.fieldName === 'predictPsychologyScale') {
      // Allow access without authentication for predictPsychologyScale
      return resolverFunction(parent, args, context, info);
    }

    // Regular authentication logic
    if (!context.user) {
      throw new AuthenticationError('Authentication required.');
    }

    // If authentication passes, invoke the resolver
    return resolverFunction(parent, args, context, info);
  } catch (error) {
    console.error('Authentication error:', error);
    throw new AuthenticationError('Authentication failed.');
  }
};

module.exports = {
  authenticateUser,
};


  