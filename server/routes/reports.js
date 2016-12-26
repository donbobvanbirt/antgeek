const express = require('express');

const router = express.Router();

const authMiddleware = require('../config/authMiddleware');
const Report = require('../models/Report');

router.post('/', authMiddleware, (req, res) => {
  // const { }
  const reportObj = req.body;
  reportObj.reportingUser = req.user.user_id;
  console.log('reportObj:', reportObj);
  Report.create(reportObj)
  .then((report) => {
    console.log('report:', report);
    res.send(report);
  })
  .catch(err => res.status(400).send(err));
});

router.get('/', (req, res) => {
  Report.find()
  .sort({ timestamp: -1 })
  .then(reports => res.send(reports))
  .catch(err => res.status(400).send(err));
});

module.exports = router;
