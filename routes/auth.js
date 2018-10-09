const passport = require('passport');
const express = require('express');
const { createAuthToken } = require('../utils/auth');

const router = express.Router();

const options = { session: false, failWithError: true };

const localAuth = passport.authenticate('local', options);

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;
