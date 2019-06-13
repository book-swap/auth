/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
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

    it('should not create a new user without email and password', done => {
      request(app)
        .post('/local/register')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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

    it('should not login with wrong email or password', done => {
      request(app)
        .post('/local/login')
        .send({ email: 'wrong_email@email.com', password: 'wrong_password' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });

    it('should not login without email and password', done => {
      request(app)
        .post('/local/login')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });

    it('should return a valid JWT', done => {
      User.create(userData)
        .then(createdUser => {
          request(app)
            .post('/local/login')
            .send(userData)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res.statusCode).to.equal(200);

              const decodedJwtPayload = jwt.verify(
                res.body.data.jwt,
                process.env.JWT_SECRET
              );
              expect(decodedJwtPayload.sub).to.equal(createdUser.id);
              expect(decodedJwtPayload.email).to.equal(userData.email);
              done();
            });
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
