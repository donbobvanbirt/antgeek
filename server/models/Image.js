const Bucket = 'image-uploader-app-build';
const AWS_URL_BASE = 's3.amazonaws.com';

const mongoose = require('mongoose');
const uuid = require('uuid');
const path = require('path');
const aws = require('aws-sdk');

const s3 = new aws.S3();

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  Key: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  tags: { type: Array },
  posts: [{
    body: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  }],
});

imageSchema.statics.upload = function (fileObj, details) {
  return new Promise((resolve, reject) => {
    const { buffer, originalname } = fileObj;
    const { description, title, tags } = details;
    const Key = uuid() + path.extname(originalname);

    const params = {
      Bucket,
      Key,
      ACL: 'public-read',
      Body: buffer,
    };

    s3.putObject(params, (err) => {
      if (err) return reject(err);
      const url = `https://${Bucket}.${AWS_URL_BASE}/${Key}`;
      console.log('params:', params);
      this.create({
        url,
        Key,
        name: originalname,
        description,
        title,
        tags: tags.split(' '),
      },
      (err, imageDoc) => {
        if (err) return reject(err);
        resolve(imageDoc);
      });
      // resolve();
    });
  });
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
