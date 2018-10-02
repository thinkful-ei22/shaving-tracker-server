const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');

const router = express.Router();

const formDataParser = formData.parse();

router.post('/upload', formDataParser, (req, res, next) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  Promise
    .all(promises)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch(err => next(err));
});
module.exports = router;
