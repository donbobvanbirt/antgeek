const express = require('express');
const router = express.Router();

const Image = require('../models/Image');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('myfile'), (req, res) => {
  console.log('req.file', req.file);
  // res.redirect('/');
  Image.upload(req.file)
    .then((imageDoc) => {
      res.send(imageDoc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/', (req, res) => {
  Image.find()
  .then(images => res.send(images))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
