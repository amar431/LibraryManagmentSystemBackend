// src/middleware/authenticateUser.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Check if the request header contains the 'Authorization' header
  const authHeader = req.headers['authorization'];
  console.log(authHeader)

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized. Authentication header missing.' });
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  // Verify the token
  jwt.verify(token, "amar_secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden. Invalid token.' });
    }

    // Attach the user object to the request for later use
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateUser;
