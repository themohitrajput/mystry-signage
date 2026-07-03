const jwt = require('jsonwebtoken');

// Signs a JWT for a given admin id. Kept in one place so the
// secret/expiry logic never drifts between login and refresh flows.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
