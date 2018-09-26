const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}', 'i');
  if (!email) {
    return true;
  }
  return re.test(email);
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validateEmail, 'Validation of `{PATH}` failed with value `{VALUE}`'],
  },
});

UserSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
    delete ret.password; // eslint-disable-line no-param-reassign
  },
});

UserSchema.methods.serialize = function serialize() {
  return {
    username: this.username || '',
    name: this.name || '',
  };
};

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);
