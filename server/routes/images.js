const express = require('express');
const router = express.Router();

const Image = require('../models/Image');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// ADD IMAGE
router.post('/:description/:title/:tags', upload.single('myfile'), (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.file', req.file);
  // res.redirect('/');
  Image.upload(req.file, req.params)
    .then((imageDoc) => {
      res.send(imageDoc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// ADD COMMENT
router.post('/comment/:id', (req, res) => {
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: req.body } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// DELETE IMAGE
router.delete('/:id', (req, res) => {
  Image.remove({ _id: req.params.id })
  .then(res.send('image deleted'))
  .catch(err => res.status(400).send(err));
});

// GET SPECIFIED IMAGE
router.get('/:id', (req, res) => {
  Image.find({ _id: req.params.id })
  .then(image => res.send(image))
  .catch(err => res.status(400).send(err));
});

// GET ALL IMAGES
router.get('/', (req, res) => {
  Image.find()
  .then(images => res.send(images))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
