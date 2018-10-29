# Database Schema Documentation

## Users

```js
{
  username: {
    type: String,
    required: true,
    unique: true
    },
   password: {
    type: String,
    required: true
   },
   email: {
    type: String,
    validate:  [validateEmail,'Validation of `{PATH}` failed with value `{VALUE}`']
   }
}
```

### Email Validation function

```js
function validateEmail(email) {
  const re = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}', 'i');
  if (!email) {
    return true;
  }
  return re.test(email);
}
```

## User_Products

```js
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  comment: String,
  nickname: String,
  imageUrl: String,
  totalUsage: { type: Number, default: 0 },
  currentUsage: { type: Number, default: 0 },
}
```

## Shaves

```js
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razorId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  bladeId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  brushId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  latherId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  aftershaveId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  additionalCareId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProduct' },
  rating: Number,
  date: { type: Date, required: true },
  imageUrl: String,
  share: { type: Boolean, default: false },
  comments: String,
}
```

## Products

```js
{
  subtype: String,
  productType: { type: String, enum: ['razor', 'blade', 'brush', 'lather', 'aftershave', 'additionalcare'] },
  brand: String,
  model: String,
}
```
