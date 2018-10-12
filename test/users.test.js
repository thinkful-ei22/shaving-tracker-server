/* eslint-disable func-names, prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app } = require('../index');

// models
const User = require('../models/user');

const { expect } = chai;
chai.use(chaiHttp);

describe.only('API - users', function () {
  beforeEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
  describe('POST /api/v1/user', function () {
    describe('given a request with complete, valid information', function () {
      it('should send a proper json response with location header', function () {
        const validUser = {
          username: 'testUsername',
          email: 'test@example.com',
          password: 'testPassword',
        };

        return chai.request(app)
          .post('/api/v1/user')
          .send(validUser)
          .then((response) => {
            expect(response).to.have.status(201);
            expect(response).header('location').to.exist;

            const { body } = response;
            expect(body).to.be.an('object');
            expect(body).to.have.keys(['username', 'email', 'id']);
          });
      });
      it('should add that user to the db', function () {
        const validUser = {
          username: 'testUsername',
          email: 'test@example.com',
          password: 'testPassword',
        };

        return chai.request(app)
          .post('/api/v1/user')
          .send(validUser)
          .then((response) => {
            expect(response).to.have.status(201);
            const { id } = response.body;
            return User.findById(id);
          })
          .then((_user) => {
            expect(_user).to.exist;
            const user = _user.toJSON();
            expect(user).to.be.an('object');
            expect(user).to.have.keys(['id', 'username', 'email']);
          });
      });
    });
    describe('given a request with a duplicate username', function () {
      it('should respond with an error', function () {
        const validUser = {
          username: 'testUsername',
          email: 'test@example.com',
          password: 'testPassword',
        };

        return chai.request(app)
          .post('/api/v1/user')
          .send(validUser)
          .then((response) => {
            expect(response).to.have.status(201);

            // we're currently relying on the db to detect duplicates, so
            // duplicate users CAN be created if the requests come too fast.
            // This function throttles the requests by making sure the db has
            // indexed before sending the next POST request
            return User.createIndexes();
          })
          .then(() => chai.request(app)
            .post('/api/v1/user')
            .send(validUser))
          .then((res) => {
            expect(res).to.have.status(422);

            const { body } = res;
            expect(body).to.be.an('object');
            expect(body).to.include.key('message');
          });
      });
    });
    describe('given a request with missing fields', function () {
      it('should respond with an error for missing `username`');
      it('should respond with an error for missing `password`');
      it('should respond with an error for missing `email`');
    });
    describe('given a request with non-string fields', function () {
      it('should respond with an error if the `username` is not a string');
      it('should respond with an error if the `password` is not a string');
      it('should respond with an error if the `email` is not a string');
    });
    describe('given a request with fields begin or end with whitespace', function () {
      it('should respond with an error if the `username` begins or ends with whitespace');
      it('should respond with an error if the `password` begins or ends with whitespace');
      it('should respond with an error if the `email` begins or ends with whitespace');
    });
    describe('given a request with fields that are an invalid length', function () {
      it('should respond with an error if the `username` is an empty string');
      it('should respond with an error if the `password` is shorter than 10');
      it('should respond with an error if the `password` is longer than 72');
    });
  });
});
