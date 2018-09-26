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

  let userProds = {};
  const productTypes = ['razor', 'blade', 'brush','lather','aftershave','additionalCare'];
  const userProductProperties = ['nickname', 'comment'];
  const globalProductProperties = ['subtype', 'productType', 'brand', 'model', 'id'];
  let returnObj = [];
  UserProduct.findOne({userId})
    .populate('razor.productId blade.productId brush.productId lather.productId aftershave.productId additionalCare.productId')
    .then(results =>{
      productTypes.forEach(prodType =>{
        userProds[prodType] = [];
        
        for(let i = 0; i < results[prodType].length; i++){
          userProds[prodType][i] = {};

          userProductProperties.forEach(property =>{
            userProds[prodType][i][property] = results[prodType][i][property];
          });
          globalProductProperties.forEach(property =>{
            userProds[prodType][i][property] = results[prodType][i].productId[property];
          })
          //manual handling of IDs
          userProds[prodType][i].productId = userProds[prodType][i].id;
          userProds[prodType][i].id = results[prodType][i].id;
        }
      });
      // console.log(userProds);
      return Shave.find({userId});
    })
    .then(results =>{
      for(let i = 0; i < results.length; i++){
        returnObj[i] = {}
        productTypes.forEach(prodType =>{
          const resIdx = `${prodType}Id`;
          const shaveItemId = results[i][resIdx];
          const item = userProds[prodType]
            .filter(prod => JSON.stringify(prod.id) === JSON.stringify(shaveItemId))[0];
            
          returnObj[i][resIdx] = item ? item : null;
        });
      }
      res.json(returnObj);
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