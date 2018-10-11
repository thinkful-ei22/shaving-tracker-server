const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Post to register a new user
router.post('/', (req, res, next) => {
  const requiredFields = ['username', 'password', 'email'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['username', 'password', 'email'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string',
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  // If the username and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['username', 'password', 'email'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field],
  );

  if (nonTrimmedField) {
    const err = new Error(
      `Field: '${nonTrimmedField}' cannot start or end with whitespace`,
    );
    err.status = 422;
    return next(err);
  }

  // Ensures character lengths
  const sizedFields = {
    username: { min: 1 },
    password: { min: 10, max: 72 },
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field]
      && req.body[field].trim().length < sizedFields[field].min,
  );
  if (tooSmallField) {
    const { min } = sizedFields[tooSmallField];
    const err = new Error(
      `Field: '${tooSmallField}' must be at least ${min} characters long`,
    );
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field]
      && req.body[field].trim().length > sizedFields[field].max,
  );

  if (tooLargeField) {
    const { max } = sizedFields[tooLargeField];
    const err = new Error(
      `Field: '${tooLargeField}' must be at most ${max} characters long`,
    );
    err.status = 422;
    return next(err);
  }


  const { username, password, email } = req.body;
  return User.hashPassword(password)
    .then((digest) => {
      const newUser = {
        username,
        password: digest,
        email,
      };
      return User.create(newUser);
    })
    .then(newUser => res
      .status(201)
      .location(`/api/v1/user/${newUser.id}`)
      .json(newUser))
    .catch((err) => {
      if (err.code === 11000) {
        /* eslint-disable no-param-reassign */
        err = new Error('The username already exists');
        err.reason = 'ValidationError';
        err.status = 422;
        err.location = 'username';
        /* eslint-enable */
      }
      next(err);
    });
});

module.exports = router;
