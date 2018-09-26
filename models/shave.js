const mongoose = require('mongoose');

const ShaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razorId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct.razor' },
  bladeId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct.blade' },
  brushId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProUserProduct.brush' },
  latherId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct.lather' },
  aftershaveId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct.aftershave' },
  additionalCareId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct.additionalcare' },
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
