const jwt = require('jsonwebtoken');

exports.generateJWTFromUser = user =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    issuer: 'auth.bookswap',
    audience: 'BookSwap',
    subject: user.id,
    expiresIn: '24h',
    algorithm: 'HS256'
  });
