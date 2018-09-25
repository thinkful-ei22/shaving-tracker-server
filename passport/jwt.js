const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config');

const options ={
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
};
console.log('secret secret, ive got a secret ', JWT_SECRET);
const jwtStrategy = new JwtStrategy(options, (payload, done) =>{
  done(null, payload.user);
});

module.exports = jwtStrategy;