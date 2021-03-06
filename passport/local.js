const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');


// ===== Define and create basicStrategy =====

const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  User.findOne({ username })
    .then((results) => {
      user = results;
      if (!user) {
        const err = new Error('Incorrect username');
        err.reason = 'LoginError';
        err.location = 'username';
        return Promise.reject(err);
      }
      return user.validatePassword(password);
    })
    .then((isValid) => {
      if (!isValid) {
        const err = new Error('Incorrect password');
        err.reason = 'LoginError';
        err.location = 'password';
        return Promise.reject(err);
      }
      return done(null, user);
    })
    .catch((err) => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);
    });
});

// const localStrategy = new LocalStrategy((username, password, done) => {
//   let user;
//   User.findOne({ username })
//     .then(results => {
//       user = results;
//       if (!user) {
//         return Promise.reject({
//           reason: 'LoginError',
//           message: 'Incorrect username',
//           location: 'username'
//         });
//       }
//       const isValid = user.validatePassword(password);
//       if (!isValid) {
//         return Promise.reject({
//           reason: 'LoginError',
//           message: 'Incorrect password',
//           location: 'password'
//         });
//       }
//       return done(null, user);
//     })
//     .catch(err => {
//       if (err.reason === 'LoginError') {
//         return done(null, false);
//       }
//       return done(err);
//     });
// });

module.exports = localStrategy;
