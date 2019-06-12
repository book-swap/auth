const router = require('express').Router();
const localAuthController = require('./controllers/local.controller');

router.post('/local/login', localAuthController.login);

router.post('/local/register', localAuthController.register);

module.exports = router;
