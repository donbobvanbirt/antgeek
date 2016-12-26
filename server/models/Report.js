const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  reportingUser: { type: String, required: true },
  reason: { type: String, required: true },
  comment: { type: String, required: true },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
