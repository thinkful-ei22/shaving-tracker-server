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

  return Shave.find({ userId })
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
        flattenedShaves[i].id = shaveEvents[i]._id;
        flattenedShaves[i].date = shaveEvents[i].date;
        flattenedShaves[i].share = shaveEvents[i].share;
        flattenedShaves[i].rating = shaveEvents[i].rating;
        flattenedShaves[i].imageUrl = shaveEvents[i].imageUrl;
        flattenedShaves[i].comments = shaveEvents[i].comments;
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

  const requiredFields = ['razorId', 'bladeId', 'brushId', 'latherId', 'aftershaveId', 'additionalCareId', 'date', 'imageUrl'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date, imageUrl, share, comments,
  } = req.body;
  const newShave = {
    userId,
    razorId,
    bladeId,
    brushId,
    latherId,
    aftershaveId,
    additionalCareId,
    rating,
    date,
    imageUrl,
    share,
    comments,
  };

  const isId = 'Id';
  const fields = Object.keys(newShave);
  fields.forEach((field) => {
    if (field.includes(isId) && newShave[field]) {
      if (!mongoose.Types.ObjectId.isValid(newShave[field])) {
        const err = new Error(`The ${field} is not valid`);
        err.status = 400;
        return next(err);
      }
    }
  });

  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
  const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));

  let result;
  Shave.create(newShave)
    .then((_result) => {
      result = _result;
      // grab the ids for each userProduct involved in the shave
      // and filter to remove unused productTypes (undefined) so we don't
      // need a conditional in the usageIncrementPromises
      const productIds = productTypes.map(type => result[`${type}Id`]).filter(Boolean);
      const updateObj = { $inc: { totalUsage: 1, currentUsage: 1 } };
      const usageIncrementPromises = productIds.map(id => (
        UserProduct.findByIdAndUpdate(id, updateObj)
      ));
      return Promise.all(usageIncrementPromises);
    })
    .then(() => Shave.findById(result.id).populate(populateQuery))
    .then((shave) => {
      const flattenedShave = {};
      productTypes.forEach((prodType) => {
        if (shave[`${prodType}Id`]) {
          flattenedShave[`${prodType}`] = createFlattenedUserProduct(shave[`${prodType}Id`]);
        } else {
          flattenedShave[`${prodType}`] = null;
        }
      });
      flattenedShave.id = shave.id;
      flattenedShave.date = shave.date;
      flattenedShave.share = shave.share;
      flattenedShave.rating = shave.rating;
      flattenedShave.imageUrl = shave.imageUrl;
      flattenedShave.comments = shave.comments;
      res.status(201).json(flattenedShave);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.put('/:id', jwtAuth, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date, share, comments,
  } = req.body;

  const updateShave = { $set: {} };

  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] !== 'undefined') {
      updateShave.$set[key] = req.body[key];
    }
  });

  const newShave = {
    userId,
    razorId,
    bladeId,
    brushId,
    latherId,
    aftershaveId,
    additionalCareId,
    rating,
    date,
    share,
    comments,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const isId = 'Id';
  const fields = Object.keys(newShave);
  fields.forEach((field) => {
    if (field.includes(isId) && newShave[field]) {
      if (!mongoose.Types.ObjectId.isValid(newShave[field])) {
        const err = new Error(`The ${field} is not valid`);
        err.status = 400;
        return next(err);
      }
    }
  });


  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
  const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));


  Shave.findByIdAndUpdate({ _id: id }, updateShave, { new: true })
    .populate(populateQuery)
    .then((shave) => {
      const flattenedShave = {};
      productTypes.forEach((prodType) => {
        if (shave[`${prodType}Id`]) {
          flattenedShave[`${prodType}`] = createFlattenedUserProduct(shave[`${prodType}Id`]);
        } else {
          flattenedShave[`${prodType}`] = null;
        }
      });
      flattenedShave.id = shave._id;
      flattenedShave.date = shave.date;
      flattenedShave.rating = shave.rating;
      flattenedShave.share = shave.share;
      flattenedShave.comments = shave.comments;
      res.status(200).json(flattenedShave);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line no-unused-vars
router.delete('/:id', jwtAuth, (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  return Shave.findOneAndRemove({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
