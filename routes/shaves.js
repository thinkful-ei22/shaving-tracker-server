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
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date,
  } = req.body;

  const newShave = {
    userId, razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date,
  };

  const isId = 'Id';
  for (const field in newShave) {
    if (field.includes(isId) && newShave[field]) {
      if (!mongoose.Types.ObjectId.isValid(newShave[field])) {
        const err = new Error(`The ${field} is not valid`);
        err.status = 400;
        return next(err);
      }
    }
  }

  const productTypes = ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalCare'];
  const populateQuery = productTypes.map(prodType => ({ path: `${prodType}Id`, populate: { path: 'productId' } }));

  Shave.create(newShave)
    .then(result => Shave.findById(result.id).populate(populateQuery))
    .then((shave) => {
      const flattenedShave = {};
      productTypes.forEach((prodType) => {
        if (shave[`${prodType}Id`]) {
          flattenedShave[`${prodType}`] = createFlattenedUserProduct(shave[`${prodType}Id`]);
        } else {
          flattenedShave[`${prodType}`] = null;
        }
      });
      flattenedShave.date = shave.date;
      flattenedShave.rating = shave.rating;
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
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date,
  } = req.body;


  const updateShave = {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date,
  };
  const newShave = {
    userId, razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating, date,
  };


  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }


  const requiredFields = [
    'razorId', 'bladeId', 'brushId', 'latherId', 'aftershaveId', 'additionalCareId', 'rating', 'date',
  ];
  // console.log(req.body);
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }


  const isId = 'Id';
  for (const field in newShave) {
    if (field.includes(isId) && newShave[field]) {
      if (!mongoose.Types.ObjectId.isValid(newShave[field])) {
        const err = new Error(`The ${field} is not valid`);
        err.status = 400;
        return next(err);
      }
    }
  }


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
      res.status(201).json(flattenedShave);
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

  Shave.findOneAndRemove({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
