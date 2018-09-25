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
  
  //Check if new product already exists in globalProducts
    //if so, get reference to globalproduct, refer to it when adding userProduct
    //if not, add to globalProduct, refer to it when adding userProduct
});

router.put('/:id', jwtAuth, (req, res, next) => {
  
});

router.delete('/:id', jwtAuth, (req, res, next) => {
  
});

module.exports = router;