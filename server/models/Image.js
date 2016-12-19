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
  genus: { type: String },
  species: { type: String },
  commonName: { type: String },
  description: { type: String },
  tags: { type: Array },
  timestamp: { type: Date, required: true, default: Date.now },
  likes: [{
    userId: { type: String, required: true },
  }],
  user: {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    user_id: { type: String, required: true },
    email: { type: String, required: true },
  },
  comments: [{
    body: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    user: {
      name: { type: String, required: true },
      picture: { type: String, required: true },
      user_id: { type: String, required: true },
      email: { type: String, required: true },
    },
  }],
});

imageSchema.statics.upload = function (fileObj, details, user) {
  return new Promise((resolve, reject) => {
    const { buffer, originalname } = fileObj;
    const { description, tags, genus, species, commonName } = details;
    // console.log('details:', details);
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
      // console.log('user in Schema:', user);
      // console.log('params:', params);
      const { name, picture, user_id, email } = user;
      const userObj = {
        name,
        picture,
        user_id,
        email,
      };

      let tagList = tags.split(',').map(tag => (tag.trim().toLowerCase()));
      if (genus) {
        tagList = tagList.concat(genus);
      }
      if (species) {
        tagList = tagList.concat(species);
      }
      if (commonName) {
        tagList = tagList.concat(commonName);
      }

      this.create({
        url,
        Key,
        name: originalname,
        description,
        genus,
        species,
        commonName,
        user: userObj,
        tags: tagList,
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
