const axios = require('axios');
const User = require('../models/user.model');
const { generateJWTFromUser } = require('../helpers/jsonwebtoken.helper');
const { sanitizeUser } = require('../helpers/user.helper');

exports.login = async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: 'Missing email or password' });

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: 'Email not found' });

    const match = await user.comparePasswords(req.body.password, user.password);

    if (!match)
      return res.status(401).json({ message: 'Wrong email or password' });

    const token = generateJWTFromUser(user);
    const data = sanitizeUser(user);
    data.jwt = token;

    return res.json({
      message: 'Logged in',
      data
    });
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: 'Missing email or password' });
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    const createdUser = await user.save();
    if (createdUser) {
      const token = generateJWTFromUser(user);

      // Pass the properties that are not related to authentication to the user service.
      axios.patch(
        'http://user:8082/me',
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          county: req.body.county,
          city: req.body.city
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.json({
        message: 'Succesfully created user',
        data: {
          id: user.id,
          email: user.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          county: req.body.county,
          city: req.body.city,
          jwt: token
        }
      });
    }

    return res.status(500).json({ messae: 'An error occured' });
  } catch (error) {
    return next(error);
  }
};
