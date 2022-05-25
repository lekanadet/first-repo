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


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


router.get('/retreive-upload',(req,res) => {

    keyname = 'repro_profile_pictures/caretaker1.jpg-1615981316264'
    var params = { Bucket: 'realprobucket', Key: keyname };
    s3.getObject(params, function(err, data) {
      if (err) {
        return res.send({ "error": err });
    }
    res.render('s3Picture',{ data:data.Body });
    });
}) 



   module.exports = router;