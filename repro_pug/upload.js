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



const imageUploadPath = path.join(__dirname,'./pictures')
const videoUploadPath = path.join(__dirname,'./videos')
const floorplanUploadPath = path.join(__dirname,'./floorplans')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname === "userPhoto1") { // if uploading resume
    callback(null, './pictures');
    } 
    if (file.fieldname === "video") {
      callback(null, './videos');
    } else {
      if (file.fieldname === "floorplan") {
        callback(null, './floorplans');
      }
    }

  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});




var upload = multer({ storage : storage}).fields([{ name: 'userPhoto1', maxCount: 3 }, { name: 'video', maxCount: 1 }, { name: 'floorplan', maxCount: 1 }])



router.get('/singleupload60',function(req,res){
      //res.render('upload');
      res.sendFile(__dirname + "/index3.html");
});


router.post('/singleupload60',function(req,res){
  

 
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log(req.files);
        console.log("File is uploaded");

        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const uploadPicture = () => {
        fs.readdir(imageUploadPath, function (err, files) {
          console.log(files.length);
          if (files.length >= 1) {
        if (err) throw err;
          files.forEach(file => { 
            console.log(file); 
            const params = {
              Bucket: 'realprobucket/repro_pictures', // pass your bucket name
              Key: file, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file, null, 2)
          };
     
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)  
              console.log(`File saved as  ${data.Key}`) 

              value = [data.Location,data.Key] 
              db.query("CALL add_picture(?,?);", value, function (err, result) {   
              if (err) throw err; 
          // console.log(result[0])
      });
    })

          fs.unlink(imageUploadPath + '/' + file, function (err) {
            if (err) throw err;
            console.log(file + ' File deleted!');
          });

      }) 
    }
    else if (files.length === 0){

      db.query("CALL add_picture_no_upload()", function (err, result) {   
        if (err) throw err; 
        // console.log(result[0])
    });

}    
});  
}  

    
        //const fileName = req.files.video[0].filename

        const uploadVideo = () => {
          fs.readdir(videoUploadPath, function (err, files) {
            console.log(files.length);
            if (files.length >= 1) {
            if (err) throw err;
              files.forEach(file => { 
                console.log(file);  
                const params = {
                  Bucket: 'realprobucket/repro_videos', // pass your bucket name
                  Key: file, // file will be saved as testBucket/contacts.csv
                  Body: JSON.stringify(file, null, 2)
              };
         
              s3.upload(params, function(s3Err, data) {
                  if (s3Err) throw s3Err
                  console.log(`File uploaded successfully at ${data.Location}`)  
                  console.log(`File saved as  ${data.Key}`) 

                  value = [data.Location,data.Key] 
                  db.query("CALL add_video(?,?);", value, function (err, result) {   
                  if (err) throw err; 
                  // console.log(result[0])
              });

            })
    
              fs.unlink(videoUploadPath + '/' + file, function (err) {
                if (err) throw err;
                console.log(file + ' File deleted!');
              });
    
          }) 
        }
          else if (files.length === 0){

                db.query("CALL add_video_no_upload()", function (err, result) {   
                  if (err) throw err; 
                  // console.log(result[0])
              });
  
        }    
     });  
   }  


          // const fileName3 = req.files.floorplan[0].filename

          const uploadFloorplan = () => {
            fs.readdir(floorplanUploadPath, function (err, files) {
              if (files.length >= 1) {
              if (err) throw err;
                files.forEach(file => { 
                  console.log(file); 
                  const params = {
                    Bucket: 'realprobucket/repro_floorplans', // pass your bucket name
                    Key: file, // file will be saved as testBucket/contacts.csv
                    Body: JSON.stringify(file, null, 2)
                };
           
                s3.upload(params, function(s3Err, data) {
                    if (s3Err) throw s3Err
                    console.log(`File uploaded successfully at ${data.Location}`)  
                    console.log(`File saved as  ${data.Key}`) 

                    value = [data.Location,data.Key] 
                  db.query("CALL add_floorplan(?,?);", value, function (err, result) {   
                  if (err) throw err; 
                  // console.log(result[0])
              });

                })
      
                fs.unlink(floorplanUploadPath + '/' + file, function (err) {
                  if (err) throw err;
                  console.log(file + ' File deleted!');
                });
      
            }) 
          }
          else if (files.length === 0){

                db.query("CALL add_floorplan_no_upload()", function (err, result) {   
                  if (err) throw err; 
                  // console.log(result[0])
              });
  
        }    
     });  
   }  

        uploadPicture();
        uploadVideo();
        uploadFloorplan();
        
        
    });

});

module.exports = router;

