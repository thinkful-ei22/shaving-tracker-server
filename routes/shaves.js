const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Shave = require('../models/shave');
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

  let userProducts = {};
  const productTypes = ['razor', 'blade', 'brush','lather','aftershave','additionalCare'];
  UserProduct.findOne({userId})
    .then(results =>{
      console.log(results);
      productTypes.forEach(prodType =>{
        userProducts[prodType] = results[prodType];
      });
      // console.log(shaveHistory);
      return Shave.find({userId});
    })
    // .populate('razorId.productId')
    .then(results =>{
      productTypes.forEach(prodType =>{
        // console.log('userProd ', userProducts[prodType]);
        const resIdx = `${prodType}Id`;
        // console.log('res0', results[0]);
        // console.log(`res0 ${resIdx}`, results[0][resIdx]);
        // const item = shaveHistory[prodType].filter(histItem => histItem.)
        // results[prodType] = 
      });
      // console.log(results);
      res.json(results);
    })
    .catch(err =>{
      next(err);
    });

});

router.post('/', jwtAuth, (req, res, next) => {
  
});

router.put('/:id', jwtAuth, (req, res, next) => {
  
});

router.delete('/:id', jwtAuth, (req, res, next) => {
  
});

module.exports = router;