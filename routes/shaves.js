const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Shave = require('../models/shave');
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

  const userProds = {};
  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
  const userProductProperties = ['nickname', 'comment'];
  const globalProductProperties = ['subtype', 'productType', 'brand', 'model', 'id'];
  const shaveHistory = [];

  // UserProduct.findOne({ userId })
  //   .populate('razor.productId blade.productId brush.productId lather.productId aftershave.productId additionalCare.productId')
  //   .then((results) => {
  //     productTypes.forEach((prodType) => {
  //       // initialize arrays to hold each productType for the user
  //       userProds[prodType] = [];

  //       // loop through each productType array returned in the user's UserProduct db result
  //       for (let i = 0; i < results[prodType].length; i += 1) {
  //         // initialize a new object to hold each entry
  //         userProds[prodType][i] = {};

  //         // copy the user's custom properties into the new object
  //         userProductProperties.forEach((property) => {
  //           userProds[prodType][i][property] = results[prodType][i][property];
  //         });
  //         // copy the global properties up to the same nesting level as the custom properties
  //         globalProductProperties.forEach((property) => {
  //           userProds[prodType][i][property] = results[prodType][i].productId[property];
  //         });
  //         // manual handling of IDs
  //         userProds[prodType][i].productId = userProds[prodType][i].id;
  //         userProds[prodType][i].id = results[prodType][i].id;
  //       }
  //     });
  //     // get all shave events for the user
  //     return Shave.find({ userId });
  //   })
  //   .then((shaveEvents) => {
  //     for (let i = 0; i < shaveEvents.length; i += 1) {
  //       // populate the ids returned in shaveEvents with the
  //       // constructed data from userProds and save the
  //       // hydrated data to shaveHistory
  //       shaveHistory[i] = {};
  //       productTypes.forEach((prodType) => {
  //         const productKey = `${prodType}Id`;
  //         const shaveItemId = shaveEvents[i][productKey];
  //         const item = userProds[prodType]
  //           .filter(prod => JSON.stringify(prod.id) === JSON.stringify(shaveItemId))[0];

  //         shaveHistory[i][productKey] = item || null;
  //       });
  //     }
  //     res.json(shaveHistory);
  //   })
  const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));

  Shave.find({ userId })
    .populate(populateQuery)
    .then((shaveEvents) => {
      const flattenedShaves = [];
      for (let i = 0; i < shaveEvents.length; i += 1) {
        flattenedShaves[i] = {};
        productTypes.forEach((prodType) => {
          if (shaveEvents[i][`${prodType}Id`]) {
            flattenedShaves[i][`${prodType}`] = createFlattenedUserProduct(shaveEvents[i][`${prodType}Id`]);
          } else {
            flattenedShaves[i][`${prodType}`] = null;
          }
        });
      }

      res.json(flattenedShaves);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.post('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

  const requiredFields = ['razorId', 'bladeId', 'brushId', 'latherId', 'aftershaveId', 'additionalCareId', 'date'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date
  } = req.body;

  const newShave = {
    userId, razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date
  }
  let isId = 'Id';
  for (let field in newShave) {
    if (field.includes(isId) && newShave[field]) {
      if (!mongoose.Types.ObjectId.isValid(newShave[field])) {
        const err = new Error(`The ${field} is not valid`);
        err.status = 400;
        return next(err);
      }    
    }
  }

  Shave.create(newShave)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.put('/:id', jwtAuth, (req, res, next) => {

});

// eslint-disable-next-line no-unused-vars
router.delete('/:id', jwtAuth, (req, res, next) => {

});

module.exports = router;
