require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const fs = require('fs');
const AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require("multer-s3");



const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: 'realprobucket',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;