/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const User = require('../src/models/user.model');

describe('POST /local/register', () => {
  const userData = {
    email: 'test_user@bookswap.ro',
    password: 'test_password'
  };

  it('should create a new user', done => {
    request(app)
      .post('/local/register')
      .send(userData)
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        const user = await User.find({ email: userData.email });
        expect(user[0]).to.exist;
        done();
      });
  });
});
