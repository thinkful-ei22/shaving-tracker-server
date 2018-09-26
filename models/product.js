const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  type: String,
  productType: { type: String, enum: ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additonalcare'] },
  brand: String,
  model: String,
});

ProductSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('Product', ProductSchema);
