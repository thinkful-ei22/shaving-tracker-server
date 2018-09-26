const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Product = require('../models/product');
const UserProduct = require('../models/userProduct');
const User = require('../models/user');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }
  

});

router.post('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

  const {brand, model, productType, comment, nickname} = req.body;
  let ref;

  const requiredFields = ['brand', 'model', 'productType'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }


  Product.findOne({brand, model, productType})
    .then(result => {
      if (result) {
        return result;
      } else {
        return Product.create({brand, model, productType});
      }
    })
    .then((result) => {
      ref = result;
      return UserProduct.findOne({userId});
    })
    .then(userProduct => {
      const doesExistArray = userProduct[`${productType}`].filter(item => {
        return JSON.stringify(item.productId) === JSON.stringify(ref._id);
      });

      if (doesExistArray.length > 0) {
        const err = new Error('Item already exist');
        err.status = 400;
        return next(err);
      }
      userProduct[`${productType}`].push({productId: ref._id, comment, nickname});
      return userProduct.save();
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(err => next(err));

  //Check if new product already exists in globalProducts
  //if so, get reference to globalproduct, refer to it when adding userProduct
  //if not, add to globalProduct, refer to it when adding userProduct
});

router.put('/:id', jwtAuth, (req, res, next) => {
  
});

router.delete('/:id', jwtAuth, (req, res, next) => {
  
});

module.exports = router;