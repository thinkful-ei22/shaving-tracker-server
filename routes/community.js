const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Shave = require('../models/shave');
const UserProduct = require('../models/userProduct');
const { createFlattenedUserProduct } = require('../helpers');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/shaves/:start/:end', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

  const startFilter = req.params.start;
  const endFilter = req.params.end;

  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
  const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));

  Shave.find({  share: true,
                date: {$gte: startFilter, $lte: endFilter}
    })
    .populate(populateQuery)
    .populate('userId')
    .then((shaveEvents) => {
      const flattenedShaves = [];
      for (let i = 0; i < shaveEvents.length; i += 1) {
        flattenedShaves[i] = {};
        flattenedShaves[i].username = shaveEvents[i].userId.username;
        productTypes.forEach((prodType) => {
          if (shaveEvents[i][`${prodType}Id`]) {
            flattenedShaves[i][`${prodType}`] = createFlattenedUserProduct(shaveEvents[i][`${prodType}Id`]);
          } else {
            flattenedShaves[i][`${prodType}`] = null;
          }
        });
        flattenedShaves[i].imageUrl = shaveEvents[i].imageUrl;
        flattenedShaves[i].id = shaveEvents[i]._id;
        flattenedShaves[i].date = shaveEvents[i].date;
        flattenedShaves[i].rating = shaveEvents[i].rating;
      }

      res.json(flattenedShaves);
    })
    .catch((err) => {
      next(err);
    });
});



module.exports = router;
