'use strict';

// npm packages
require('dotenv').config();
const mongoose = require('mongoose');

// config
const { DATABASE_URL } = require('../config');

// models
const User = require('../models/user');
const Product = require('../models/product');
const UserProduct = require('../models/userProduct');
const Shave = require('../models/shave');

// seed data
const seedUsers = require('../db/seed/users');
const seedProducts = require('../db/seed/products');
const seedUserProducts = require('../db/seed/user-products');
const seedShaves = require('../db/seed/shaves');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      User.insertMany(seedUsers),
      User.createIndexes(),

      Product.insertMany(seedProducts),
      Product.createIndexes(),

      UserProduct.insertMany(seedUserProducts),
      UserProduct.createIndexes(),

      Shave.insertMany(seedShaves),
      Shave.createIndexes()
    ]);
  })
  .then(
    ([
      users,
      usersIndexes,
      products,
      productsIndexes,
      userProducts,
      userProductsIndexes,
      shaves,
      shavesIndexes
    ]) => {
      
      console.info(`Inserted ${users.length} users`);
      console.info(`Inserted ${products.length} products`);
      console.info(`Inserted ${userProducts.length} userProducts objects`);
      console.info(`Inserted ${shaves.length} shaves`);

      console.info('Disconnecting');
      return mongoose.disconnect();
    })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
