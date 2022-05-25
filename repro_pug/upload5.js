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

const imageUploadPath = path.join(__dirname,'./uploads')
const imageUploadPath1 = path.join(__dirname,'./upload1')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});

var storage2 =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload1');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});



var upload = multer({ storage : storage}).array('userPhoto1',3);



app.get('/singleupload5',function(req,res){
      //res.render('upload');
      res.sendFile(__dirname + "/index.html");
});


app.post('/singleupload5',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log("File is uploaded");
        

        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const uploadFile = () => {
        fs.readdir(imageUploadPath, function (err, files) {
        if (err)
          throw err;
          files.forEach(file => { 
            console.log(file); 
            const params = {
              Bucket: 'realprobucket', // pass your bucket name
              Key: file, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file, null, 2)
          };
     
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)  
              console.log(`File saved as  ${data.Key}`) 
          })

          fs.unlink(imageUploadPath + '/' + file, function (err) {
            if (err) throw err;
            console.log(file + ' File deleted!');
          });

      }) 
 });
        }

        uploadFile();
    });

});




app.listen(3000,function(){
    console.log("Working on port 3000");
});