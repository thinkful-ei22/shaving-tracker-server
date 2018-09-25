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
    required: true,
    unique: true
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
const re = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}','i');
if (!email) {
  return true;
}
return re.test(email);
}
```

## User_Products

```js
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  razors: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }],
  blades: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }],
  brushes: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }],
  lathers: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }],
  aftershaves: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }],
  additionalcares: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: String
    nickname: String
  }]
}
```

## Shaves

```js
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  razorId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  bladeId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  brushId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  latherId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  aftershaveId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  additionalCare: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  date: { type:Date, required:true }
}
```

## Products

```js
{
  type: String,
  productType: { type: String, enum: ["razor", "blade", "brush", "lather", "aftershave", "additonalcare"]},
  brand: String,
  model: String,
}
```
