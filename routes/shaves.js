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

// ```json
// {
//     "razorId": "sadf32fs32r",
//     "bladeId": "sdfafw42fsf",
//     "brushId": "f5i4yjesfks",
//     "latherId": "asdfj4rkef3",
//     "aftershaveId": "f5i4yjes333",
//     "additionalCare": "f5i4yje2354",
//     "rating": 3,
// }
// ```
  const {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating
  } = req.body;

  const newShave = {
    razorId, bladeId, brushId, latherId, aftershaveId, additionalCareId, rating
  }

  Shave.create(newShave)
    .then(result => {
      console.log(result);
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
