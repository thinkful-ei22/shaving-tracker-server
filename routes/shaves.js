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

  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
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
        flattenedShaves[i].date = shaveEvents[i].date;
        flattenedShaves[i].rating = shaveEvents[i].rating;
      }

      res.json(flattenedShaves);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.post('/', jwtAuth, (req, res, next) => {

});

// eslint-disable-next-line no-unused-vars
router.put('/:id', jwtAuth, (req, res, next) => {

});

// eslint-disable-next-line no-unused-vars
router.delete('/:id', jwtAuth, (req, res, next) => {

});

module.exports = router;
