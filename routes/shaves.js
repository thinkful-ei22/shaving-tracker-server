const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Shave = require('../models/shave');
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
