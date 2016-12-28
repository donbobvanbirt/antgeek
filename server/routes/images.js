const express = require('express');
const multer = require('multer');

const router = express.Router();

const Image = require('../models/Image');

const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require('../config/authMiddleware');

// ADD COMMENT
router.post('/comment/:id', authMiddleware, (req, res) => {
  // console.log('req.user:', req.user);
  const commentObj = {
    body: req.body.body,
    user: req.user,
  };
  // console.log('req.body:', req.body);
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: commentObj } },
    { new: true }
  )
  .then((updatedImage) => {
    // console.log('res.send:', res.send);
    // res.send('comment added');
    res.send(updatedImage);
  })
  .catch(err => res.status(400).send(err));
});

// ADD TAGS
router.post('/tags/:id/', authMiddleware, (req, res) => {
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $pushAll: { tags: req.body.newTags } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// REMOVE TAG
router.put('/untag/:id/', authMiddleware, (req, res) => {
  Image.findOneAndUpdate(
    { _id: req.params.id, 'user.user_id': req.user.user_id },
    { $pull: { tags: req.body.tag } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// ADD ID
router.post('/id/:imageId/', authMiddleware, (req, res) => {
  const { id, value } = req.body;
  Image.findOneAndUpdate(
    { _id: req.params.imageId },
    { $set: { [id]: value }, $push: { tags: value.trim().toLowerCase() } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// ADD LIKE
router.put('/like/:id/', authMiddleware, (req, res) => {
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { likes: req.user.user_id } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// REMOVE LIKE
router.put('/unlike/:id/', authMiddleware, (req, res) => {
  // console.log('req.user:', req.user);
  Image.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { likes: req.user.user_id } },
    { new: true }
  )
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// GET IMAGES BY USER ID
router.get('/user/:user', (req, res) => {
  Image.find({ 'user.user_id': req.params.user })
  .sort({ timestamp: -1 })
  .then(results => res.send(results))
  .catch(err => res.status(400).send(err));
});

// GET LIKED IMAGES
router.get('/liked/:userId', (req, res) => {
  Image.find({ likes: req.params.userId })
  .sort({ timestamp: -1 })
  .then(results => res.send(results))
  .catch(err => res.status(400).send(err));
});

// GET SEARCH RESULTS
router.get('/search/:searchQuery', (req, res) => {
  Image.find({ tags: req.params.searchQuery })
  .sort({ timestamp: -1 })
  .then(results => res.send(results))
  .catch(err => res.status(400).send(err));
});

// DELETE IMAGE
router.put('/delete/:id', authMiddleware, (req, res) => {
  Image.remove({ _id: req.params.id, 'user.user_id': req.user.user_id })
  .then(res.send('image deleted'))
  .catch(err => res.status(400).send(err));
});

// UPDATE IMAGE
router.put('/:id', authMiddleware, (req, res) => {
  Image.findOneAndUpdate(
    { _id: req.params.id, 'user.user_id': req.user.user_id },
    { $set: req.body },
    { new: true })
  .then(updatedImage => res.send(updatedImage))
  .catch(err => res.status(400).send(err));
});

// GET SPECIFIED IMAGE
router.get('/:id', (req, res) => {
  Image.find({ _id: req.params.id })
  .then(image => res.send(image))
  .catch(err => res.status(400).send(err));
});

// ADD IMAGE
router.post('/', authMiddleware, upload.single('myfile'), (req, res) => {
  // console.log('req.query:', req.query);
  // console.log('req.params:', req.params);
  // console.log('req.user', req.user);
  // res.redirect('/');
  Image.upload(req.file, req.query, req.user)
    .then((imageDoc) => {
      // console.log('imageDoc:', imageDoc);
      res.send(imageDoc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// GET ALL IMAGES
router.get('/', (req, res) => {
  Image.find().sort({ timestamp: -1 })
  .then(images => res.send(images))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
