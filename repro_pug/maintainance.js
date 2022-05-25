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

  



router.get('/get-maintainance',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    value = [user_id] 
    db.query("CALL get_maintainance_request(?)",
    value, function (err, result) {   
       if (err) throw err; 
       console.log(result[3])
       res.render('maintainance',
        { 
       title1: 'Maintainance',
       data: result[0],
       data1: result[1],
       data2: result[2],
       data3: result[3]
      })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   router.get('/new-maintainance-request',(req,res) => {
    if (req.session.loggedin) {
        p_id = req.query.p
        console.log(p_id)
         res.render('new-maintainance-request', { title1: 'Maintainance', id: p_id}) 
        }
      else {
        res.send('Please login to view this page!');
      }
     }) 


  const imageUploadPath = path.join(__dirname,'./maintainance_uploads')

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      if (file.fieldname === "upload") { // if uploading resume
      callback(null, './maintainance_uploads');
      } 
      if (file.fieldname === "property_video") {
        callback(null, './videos');
      } else {
        if (file.fieldname === "floor_plan") {
          callback(null, './floorplans');
        }
      }
  
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + '-' + Date.now());
    }
  });


  var upload = multer({ storage : storage}).array('upload',3)



   router.post('/submit-new-maintainance-request/:id',(req,res) => {
    if (req.session.loggedin) {
      
      upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log(req.files)
        console.log(req.body.title)
      
        console.log("File is uploaded");

      
         
       // res.send("No file upload")
         property_id = req.params.id
         user_id = req.session.userid
         title = req.body.title
         importance = req.body.importance
         message = req.body.message
         
         value = [property_id,user_id,title,importance,message] 
         db.query("CALL new_maintainance_request(?,?,?,?,?)", value, function (err, result) {   
            if (err) throw err; 
           // console.log(result[0])
           // res.redirect('/get-maintainance')
          })     


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});



const uploadFile = () => {
  fs.readdir(imageUploadPath, function (err, files) {
    if (files.length >= 1) {
    if (err) throw err;
    files.forEach(file => { 
      console.log(file); 
   const params = {
       Bucket: 'realprobucket/repro', // pass your bucket name
       Key: file, // file will be saved as testBucket/contacts.csv
       Body: JSON.stringify(files, null, 2)
   };
   s3.upload(params, function(s3Err, data) {
       if (s3Err) throw s3Err
       console.log(`File uploaded successfully at ${data.Location}`)
       console.log(`File saved as  ${data.Key}`)
      
      
      attachment_url = data.Location
      attachment_name = data.Key
      
      value = [attachment_url,attachment_name] 
      db.query("CALL add_maintainance_attachment(?,?)", value, function (err, result) {   
         if (err) throw err; 
        // console.log(result[0])
         
        });
      });
      
      fs.unlink(imageUploadPath + '/' + file, function (err) {
        if (err) throw err;
        console.log(file + ' File deleted!');
      });

       })
      }
      else if (files.length === 0){

        db.query("CALL add_maintainance_attachment_no_upload()", function (err, result) {   
          if (err) throw err; 
          // console.log(result[0])
      });
  
  }    


      })
    }
       uploadFile();
    
       res.redirect('/get-maintainance')
    
      
    })
    }
      else {
        res.send('Please login to view this page!');
      }
     })
     
  
         
     router.get('/get-maintainance-details/:id',(req,res) => {
      if (req.session.loggedin) {

        id = req.params.id;
        console.log(id)

        //sql = 'select * from maintainance where m_id = ?'       
        db.query("CALL maintainance_details(?);", [id], function (err, result) {   
           if (err) throw err; 
           console.log(result[0])
          // console.log(result[0][0])
         // console.log(result[2][0].v_result)
           //console.log(result[0][0].attachment_name)
          // console.log(result[0].attachment_name)
          //var fileName = result[0][0].attachment_name


       //   const params = {
      //      Bucket: 'realprobucket', // pass your bucket name
      //      Key: fileName
      //  }

      //  const s3 = new AWS.S3({
     //     accessKeyId: process.env.AWS_ACCESS_KEY,
    //      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    //    });
          //var params = { Bucket: config.bucket, Key: req.params.imageId };
          //s3.getObject(params, function(s3Err, data) {
          //  if (s3Err) throw s3Err
          

           res.render('maintainanceDetails',
            {          
           title1: 'Maintainance Details',
           data: result[0],
           attachment_data: result[1],
           data1: id,
           data2: result[2],
           image: "https://i.ibb.co/d6JNxfd/house2.jpg"
          })
       // })
        })
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 



       router.post('/send-comment/:id',(req,res) => {
        if (req.session.loggedin) {

          m_id = req.params.id
          m_id2 = req.params.id
          comment = req.body.comment
      
          value = [m_id,comment] 
          db.query("CALL new_comment(?,?)", value, function (err, result) {   
             if (err) throw err; 
             console.log(result[0])
             
             res.redirect(`/get-maintainance-details/${m_id2}`)
           })
          } 
          else {
            res.send('Please login to view this page!');
          }
         })


   module.exports = router;