const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  subtype: String,
  productType: { type: String, enum: ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalcare'] },
  brand: String,
  model: String,
});

ProductSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign
  },
});

module.exports = mongoose.model('Product', ProductSchema);
