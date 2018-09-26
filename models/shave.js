const mongoose = require('mongoose');

const ShaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  bladeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  brushId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  latherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  aftershaveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  additionalCare: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  rating: Number,
  date: { type: Date, required: true },
});

ShaveSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('Shave', ShaveSchema);
