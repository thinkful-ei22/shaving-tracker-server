const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Product = require('../models/product');
const UserProduct = require('../models/userProduct');
const { createFlattenedUserProduct } = require('../helpers');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

  UserProduct.findOne({userId})
    .populate('razor.productId blade.productId brush.productId lather.productId aftershave.productId additionalCare.productId')
    .then(result => result ? res.json(result) : next())
    .catch(err => next(err));
});

router.post('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

  // validate all required fields were submitted
  const requiredFields = ['brand', 'model', 'productType'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${missingField}`;
    return next(err);
  }

  // validate fields that should be strings are actually of type 'string'
  const stringFields = ['brand', 'model', 'productType', 'subtype', 'comment', 'nickname'];
  const nonStringField = stringFields.find(field => ((req.body[field]) && (typeof req.body[field] !== 'string')));
  if (nonStringField) {
    const err = new Error(`The \`${nonStringField}\` must be of type \`string\``);
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${nonStringField}`;
    return next(err);
  }

  // validate required fields are not empty strings
  const emptyField = requiredFields.find(field => req.body[field].trim().length === 0);
  if (emptyField) {
    const err = new Error(`The \`${emptyField}\` cannot be an empty string`);
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${emptyField}`;
    return next(err);
  }

  // required fields have been validated as existing
  // non-required fields will be undefined and will
  // not pass through into the database
  const {
    brand, model, productType, comment, nickname, subtype,
  } = req.body;
  // will hold the global Product reference once found or created
  let ref;

  // Check if new product already exists in globalProducts
  Product.findOne({
    brand, model, productType, subtype,
  })
    .then((result) => {
      // if globalProduct already exists, use reference
      if (result) {
        return result;
      }
      // if not, add to globalProduct
      return Product.create({
        brand, model, productType, subtype,
      });
    })
    .then((result) => {
      // refers to a pre-existing or newly-created globalProduct
      ref = result;
      const productId = ref._id;
      return UserProduct.findOne({ userId, productId });
    })
    .then((userProduct) => {
      if (userProduct) {
        const err = new Error('Item already exists');
        err.status = 400;
        return Promise.reject(err);
      }

      const productId = ref._id;
      const newUserProduct = {
        userId, productId, comment, nickname,
      };

      return UserProduct.create(newUserProduct);
    })
    .then(newUserProd => UserProduct.findById(newUserProd.id).populate('productId'))
    .then((result) => {
      const flatResult = createFlattenedUserProduct(result);
      res.status(201).json(flatResult);
    })
    .catch(err => next(err));
});

// eslint-disable-next-line no-unused-vars
router.put('/:id', jwtAuth, (req, res, next) => {

});

// eslint-disable-next-line no-unused-vars
router.delete('/:id', jwtAuth, (req, res, next) => {

});

module.exports = router;
