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

// seedData
const seedUsers = require('../db/seed/users');
const seedProducts = require('../db/seed/products');

const { expect } = chai;
chai.use(chaiHttp);

describe('API - userProducts', function () {
  describe('POST /api/v1/products/personal/many', function () {
    describe('given an existing, valid user', function () {
      beforeEach(async function () {
        // verify clean db to prevent error on first run
        await mongoose.connection.db.dropDatabase();
        await Promise.all([
          User.insertMany(seedUsers),
          User.createIndexes(),

          Product.insertMany(seedProducts),
          Product.createIndexes(),
        ]);
        const validUser = seedUsers[0];
        validUser.password = 'wicked';
      });
      afterEach(function () {
        return mongoose.connection.db.dropDatabase();
      });
      describe('when the user submits an array of multiple valid products', function () {
        const validUserProducts = [
          {
            brand: 'Gillette',
            model: 'Tech Travel',
            productType: 'razor',
            subtype: 'Double Edge',
            comment: '1964 vintage',
            nickname: 'Gillette Tech Travel',
          },
          {
            brand: 'Rockwell',
            model: '6S',
            productType: 'razor',
            subtype: 'Double Edge',
            comment: 'R5',
            nickname: 'Rockwell 6S R5',
          },
        ];

        it('adds them all to the users collection of products', function () {
          const validUser = {
            id: seedUsers[0]._id,
            username: seedUsers[0].username,
            email: seedUsers[0].email,
            password: 'wicked',
          };
          const authToken = createAuthToken(validUser);

          return UserProduct.find({ userId: validUser.id })
            .then((data) => {
              expect(data.length).to.equal(0);

              return chai.request(app)
                .post('/api/v1/products/personal/many')
                .set('Authorization', `Bearer ${authToken}`)
                .send(validUserProducts);
            })
            .then((res) => {
              expect(res).to.have.status(200);
              const { body } = res;
              expect(body).to.be.an('array');
              body.forEach((item) => {
                expect(item).to.be.an('object');
                expect(item).to.have.keys(['product', 'status']);
              });

              return UserProduct.find({ userId: validUser.id });
            })
            .then((data) => {
              expect(data).to.be.an('array');
              expect(data.length).to.equal(validUserProducts.length);
            });
        });
        it('responds with an array of flattened objects', function () {
          const validUser = {
            id: seedUsers[0]._id,
            username: seedUsers[0].username,
            email: seedUsers[0].email,
            password: 'wicked',
          };
          const authToken = createAuthToken(validUser);

          return chai.request(app)
            .post('/api/v1/products/personal/many')
            .set('Authorization', `Bearer ${authToken}`)
            .send(validUserProducts)
            .then((res) => {
              expect(res).to.have.status(200);
              const { body } = res;
              expect(body).to.be.an('array');
              body.forEach((item) => {
                expect(item).to.be.an('object');
                expect(item).to.have.keys(['product', 'status']);

                const { product, status } = item;
                expect(status).to.equal(200);
                expect(product).to.be.an('object');
                expect(product).to.have.keys([
                  'nickname',
                  'comment',
                  'totalUsage',
                  'currentUsage',
                  'userId',
                  'subtype',
                  'productType',
                  'brand',
                  'model',
                  'id',
                  'productId',
                ]);
              });
            });
        });
      });
    });
  });
});
