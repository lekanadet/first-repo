require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const fs = require('fs');
const AWS = require('aws-sdk');
var multiparty = require('multiparty');
var multer  = require('multer');
const multers3 = require("multer-s3");


app.get('/s3Proxy', function(req, res, next){
    // download the file via aws s3 here
    var fileKey = req.query['fileKey'];

    console.log('Trying to download file', fileKey);
    var AWS = require('aws-sdk');
    AWS.config.update(
      {
        accessKeyId: "....",
        secretAccessKey: "...",
        region: 'ap-southeast-1'
      }
    );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : '/bucket-url',
        Key    : fileKey,
    };

    res.attachment(fileKey);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
});


app.get('/download-file', function(req, res, next){
var s3 = new AWS.S3();
var s3Params = {
    Bucket: 'your bucket',
    Key: 'path/to/the/file.ext'
};
s3.getObject(s3Params, function(err, res) {
    if (err === null) {
       res.attachment('file.ext'); // or whatever your logic needs
       res.send(data.Body);
    } else {
       res.status(500).send(err);
    }
});
});





app.listen(3000,function(){
    console.log("Working on port 3000");
});