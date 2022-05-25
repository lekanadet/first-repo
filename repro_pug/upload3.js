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



router.get('/singleupload2',(req,res) => {
  if (req.session.loggedin) {
       res.render('upload2') 
      }
    else {
      res.send('Please login to view this page!');
    }
   }) 



router.post('/singleupload2', (req, res) => {


var file = req.files.upload // here 'upload' in upload2.hbs form input name
var file2 = req.files.upload2 // here 'upload2' in upload2.hbs form input name

const imageUploadPath1 = path.join(__dirname,'./upload1')
const imageUploadPath2 = path.join(__dirname,'./upload2')

file.mv(imageUploadPath1 + file.name)
file2.mv(imageUploadPath2 + file2.name)
console.log(file.name)
console.log(file2.name)

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = file.name;
const fileName2 = file2.name;

const uploadFile = () => {
  fs.readFile(imageUploadPath1 + fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'realprobucket/repro', // pass your bucket name
         Key: Date.now().toString() + fileName, // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };

     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)  
         console.log(`File saved as  ${data.Key}`) 
     })

     fs.unlink(imageUploadPath1 + fileName, function (err) {
      if (err) throw err;
      console.log(fileName + ' File deleted!');
    });

    })
  }

  const uploadFile2 = () => {
    fs.readFile(imageUploadPath2 + fileName2, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: 'realprobucket/repro', // pass your bucket name
           Key: Date.now().toString() + fileName2, // file will be saved as testBucket/contacts.csv
           Body: JSON.stringify(data, null, 2)
       };
  
       s3.upload(params, function(s3Err, data) {
           if (s3Err) throw s3Err
           console.log(`File uploaded successfully at ${data.Location}`)  
           console.log(`File saved as  ${data.Key}`) 
       })
  
       fs.unlink(imageUploadPath2 + fileName2, function (err) {
        if (err) throw err;
        console.log(fileName2 + ' File deleted!');
      });
  
      })
    }
    uploadFile();
    uploadFile2();
});


router.post('/singleupload3', (req, res) => {

  var file3 = req.files
  var file = req.files.upload // here 'upload' in upload2.hbs form input name
  var file2 = req.files.upload2 // here 'upload2' in upload2.hbs form input name
 
  console.log(file.name)
  console.log(file2.name)
  console.log(file3.name)

})



   module.exports = router;