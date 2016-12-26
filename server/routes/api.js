const express = require('express');

const router = express.Router();

router.use('/images', require('./images'));
router.use('/users', require('./users'));
router.use('/reports', require('./reports'));

module.exports = router;
