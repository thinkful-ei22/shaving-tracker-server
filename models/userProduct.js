const mongoose = require('mongoose');

const UserProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razors: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  blades: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  brushes: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  lathers: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  aftershaves: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  additionalcares: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
});

UserProductSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('UserProduct', UserProductSchema);
