const mongoose = require('mongoose');

const UserProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razor: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  blade: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  brush: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  lather: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  aftershave: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: String,
    nickname: String,
  }],
  additionalcare: [{
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
