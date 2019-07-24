const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();

// db container & auth container are on the same network in docker, so we can use 'db' as hostname
// db is not exposed to the internet
mongoose
  .connect(
    process.env.TRAVIS
      ? 'mongodb://localhost/test'
      : 'mongodb://db:27017/bookswap',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://bookswap.ro'
        : 'http://localhost:8080'
  })
);
// API Routes
app.use(router);

// Error handler
app.use((err, req, res, next) => {
  // Log error message in our server's console
  console.error(process.env.NODE_ENV === 'production' ? err.message : err);

  // If err has no specified error code, send status 500 'Internal Server Error'
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({ message: err.message });
  next();
});

module.exports = app;
