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




router.get('/upload',(req,res) => {

  res.render('upload2',{title1: 'Upload'})

 }) 



router.post('/upload',(req,res) => {

  if (!req.files) {
  	         res.send("No file upload")
         } else {

 var file = req.files.upload // here 'upload' in upload2.hbs form input name
 file.mv('C:/Users/OLALEKAN/Desktop/repro/'+ file.name)
console.log(file.name)

  const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const fileName = file.name;
  
  const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: 'realprobucket', // pass your bucket name
           Key: fileName, // file will be saved as testBucket/contacts.csv
           Body: JSON.stringify(data, null, 2)
       };
       s3.upload(params, function(s3Err, data) {
           if (s3Err) throw s3Err
           console.log(`File uploaded successfully at ${data.Location}`)
       });
    });
  };

  
  uploadFile();
}

   }) 

  


   router.get('/upload2',(req,res) => {

    res.render('upload2',{title1: 'Upload'})

   })   


  


router.get('/get-message',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    value = [user_id]
    db.query("CALL get_message(?)",value, function (err, result) {   
      if (err) throw err; 
    res.render('message',
    { 
   title1: 'Message',
   id: user_id,
   inbox: result[0],
   sent: result[1]

  })
})
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 

 


   router.get('/new-message/:id',(req,res) => {
    if (req.session.loggedin) {
        user_id = req.params.id
        console.log(user_id)
         res.render('new-message', { title1: 'Message', id: user_id}) 
        }
      else {
        res.send('Please login to view this page!');
      }
     }) 

  
     const imageUploadPath = path.join(__dirname,'./message_uploads')

     var storage =   multer.diskStorage({
       destination: function (req, file, callback) {
         if (file.fieldname === "message_upload") { // if uploading resume
         callback(null, './message_uploads');
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
   
   
     var upload = multer({ storage : storage}).single('message_upload')   


   router.post('/submit-new-message/:id',(req,res) => {
    if (req.session.loggedin) {

      upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading Pictures.");
        }
        console.log("File upload connected");

        console.log(req.file)
        console.log(req.body.title)
        console.log(req.body.receipient.length)
        

      
      receipient = req.body.receipient
      user_id = req.params.id
      title = req.body.title
      message = req.body.message
      value = [receipient,user_id,title,message] 

      console.log(value)
      db.query("CALL new_message(?,?,?,?)", value, function (err, result) {   
         
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
              db.query("CALL add_message_attachment(?,?)", value, function (err, result) {   
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
        
                db.query("CALL add_message_attachment_no_upload()", function (err, result) {   
                  if (err) throw err; 
                  // console.log(result[0])
              });
          
          }    
        
        
              })
            }
               uploadFile();
            
               res.redirect('/get-message')
      
       })
      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     })
     
  
         
     router.get('/get-inbox-details/:id',(req,res) => {
      if (req.session.loggedin) {

        id = req.params.id;
        user_id = req.session.userid
        value = [id,user_id]
        //sql = 'select * from maintainance where m_id = ?'       
        db.query("CALL get_inbox_details(?,?)", value, function (err, result) {   
           if (err) throw err; 
        
           res.render('inboxDetails',
            {         
              title1: 'Inbox Details',
              data: result[0],
              data1: result[1],
              id: id
          })
         })
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 


       router.get('/get-sent-details/:id',(req,res) => {
        if (req.session.loggedin) {
  
          id = req.params.id;
          user_id = req.session.userid
          value = [id,user_id]
  
          //sql = 'select * from maintainance where m_id = ?'       
          db.query("CALL get_sent_details(?,?)", value, function (err, result) {   
             if (err) throw err; 
         
             res.render('sentDetails',
              {          
             title1: 'Sent Details',
             data: result[0],
             data1: result[1],
             id: id
            })
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