/* eslint-disable func-names, prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app } = require('../index');
const { createAuthToken } = require('../utils/auth');

// models
const User = require('../models/user');
const Product = require('../models/product');
const UserProduct = require('../models/userProduct');
const Shave = require('../models/shave');

// seedData
const seedUsers = require('../db/seed/users');
const seedProducts = require('../db/seed/products');
const seedUserProducts = require('../db/seed/user-products');
const seedShaves = require('../db/seed/shaves');

const { expect } = chai;
chai.use(chaiHttp);

describe('API - shaves', function () {
  describe('POST /api/v1/shaves', function () {
    describe('given an existing, valid user', function () {
      beforeEach(async function () {
        // verify clean db to prevent error on first run
        await mongoose.connection.db.dropDatabase();
        await Promise.all([
          User.insertMany(seedUsers),
          User.createIndexes(),

          Product.insertMany(seedProducts),
          Product.createIndexes(),

          UserProduct.insertMany(seedUserProducts),
          UserProduct.createIndexes(),
        ]);
        const validUser = seedUsers[0];
        validUser.password = 'wicked';
      });
      afterEach(function () {
        return mongoose.connection.db.dropDatabase();
      });
      describe('when the user submits a valid new shave', function () {
        it('should add that shave to the db', function () {
          const validUser = {
            id: seedUsers[0]._id,
            username: seedUsers[0].username,
            email: seedUsers[0].email,
            password: 'wicked',
          };
          const authToken = createAuthToken(validUser);
          const validShave = seedShaves[0];

          return chai.request(app)
            .post('/api/v1/shaves')
            .set('Authorization', `Bearer ${authToken}`)
            .send(validShave)
            .then((res) => {
              expect(res).to.have.status(201);

              return Shave.findOne({ userId: validUser.id });
            })
            .then((_data) => {
              const data = _data.toJSON();
              const expectedDbKeys = ['additionalCareId', 'aftershaveId', 'bladeId', 'brushId', 'date', 'id', 'imageUrl', 'latherId', 'rating', 'razorId', 'share', 'userId'];
              expect(data).to.have.keys(expectedDbKeys);

              expectedDbKeys.forEach((key) => {
                if (key === 'date') {
                  expect(data[key].toUTCString()).to.equal(new Date(validShave[key]).toUTCString());
                } else if (key === 'id') {
                  expect(data[key]).to.exist;
                } else if (key === 'share') {
                  expect(data[key]).to.equal(validShave[key]);
                } else {
                  expect(data[key].toString()).to.equal(validShave[key]);
                }
              });
            });
        });
        it('should send a response containing a flattened version of the new shave', function () {
          const validUser = {
            id: seedUsers[0]._id,
            username: seedUsers[0].username,
            email: seedUsers[0].email,
            password: 'wicked',
          };
          const authToken = createAuthToken(validUser);
          const validShave = seedShaves[0];

          let resShave;
          let dbShave;
          return chai.request(app)
            .post('/api/v1/shaves')
            .set('Authorization', `Bearer ${authToken}`)
            .send(validShave)
            .then((res) => {
              expect(res).to.have.status(201);

              const { body } = res;
              const expectedResKeys = ['additionalCare', 'aftershave', 'blade', 'brush', 'date', 'id', 'imageUrl', 'lather', 'rating', 'razor', 'share'];
              expect(body).to.be.an('object');
              expect(body).to.have.keys(expectedResKeys);
              resShave = body;

              const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
              const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));
              return Shave.findOne({ userId: validUser.id })
                .populate(populateQuery);
            })
            .then((_data) => {
              dbShave = _data.toJSON();
              // loop through the resShave and check each field against the dbShave version
              const resKeys = Object.keys(resShave);
              const sharedKeys = ['productType', 'subType', 'brand', 'model'];
              const customKeys = ['comment', 'nickname', 'imageUrl', 'id', 'share'];
              resKeys.forEach((key) => {
                if (dbShave[`${key}Id`]) {
                  expect(resShave[key].productId).to.equal(dbShave[`${key}Id`].productId.id);
                  sharedKeys.forEach((sKey) => {
                    expect(resShave[key][sKey]).to.eql(dbShave[`${key}Id`].productId[sKey]);
                  });
                  customKeys.forEach((cKey) => {
                    expect(resShave[cKey]).to.equal(dbShave[cKey]);
                  });
                } else if (key === 'date') {
                  expect(new Date(resShave[key]).toUTCString()).to.equal(dbShave[key].toUTCString());
                } else {
                  expect(resShave[key]).to.equal(dbShave[key]);
                }
              });
            });
        });
        it('should increment the usage counter on all userProducts used');
      });
      describe('when the user submits an invalid shave', function () {
        it('should reject shaves missing a razor');
        it('should reject shaves missing a blade');
        it('should reject shaves missing a date');
      });
    });
    describe('given an unauthenticated user', function () {
      it('should reject all shaves without a valid userId');
    });
  });
});
