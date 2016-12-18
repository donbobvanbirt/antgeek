const express = require('express');

const router = express.Router();

const admin = require('../config/firebaseAdmin');

router.get('/:userId', (req, res) => {
  admin.auth().getUser(req.params.userId)
  .then((userRecord) => {
    const { displayName, photoURL, metadata } = userRecord;
    const userInfo = {
      displayName,
      photoURL,
      metadata,
    };
    console.log('Successfully fetched user data:', userRecord.toJSON());
    return res.send(userInfo);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    return res.status(400);
  });
});

module.exports = router;
