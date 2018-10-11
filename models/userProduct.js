const mongoose = require('mongoose');

const UserProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  comment: String,
  nickname: String,
  imageUrl: String,
  totalUsage: { type: Number, default: 0 },
  currentUsage: { type: Number, default: 0 },
});

UserProductSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('UserProduct', UserProductSchema);
