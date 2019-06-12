/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const User = require('../src/models/user.model');

describe("'auth' test suite", () => {
  const userData = {
    email: 'test_user@bookswap.ro',
    password: 'test_password'
  };

  afterEach(() => {
    User.deleteMany({}).catch(error => console.log(error));
  });

  describe('POST /local/register', () => {
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

  describe('POST /local/login', () => {
    it('should login a user', done => {
      User.create(userData)
        .then(createdUser => {
          request(app)
            .post('/local/login')
            .send(userData)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res.statusCode).to.equal(200);
              expect(res.body.data.email).to.equal(createdUser.email);
              expect(res.body.data.email).to.equal(userData.email);
              done();
            });
        })
        .catch(err => {
          throw err;
        });
    });

    it('should return a valid JWT', done => {
      // TODO
      done();
    });
  });
});
