'use strict';

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


  UserProduct.findOne({userId})
    // .sort({createdAt: 'desc'})
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    });

});

router.post('/:productType', jwtAuth, (req, res, next) => {
  
});

router.put('/:id', jwtAuth, (req, res, next) => {
  
});

router.delete('/:id', jwtAuth, (req, res, next) => {
  
});

module.exports = router;