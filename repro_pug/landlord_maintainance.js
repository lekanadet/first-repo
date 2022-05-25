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

  



router.get('/get-landlord-maintainance',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    value = [user_id] 
    db.query("CALL landlord_property_dropdown(?)",
    value, function (err, result) {   
       if (err) throw err; 
       res.render('landlord_property_dropdown',
        { 
       title1: 'Landlord Maintainance',
       property_data: result[0]
      })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


router.get('/get-landlord-maintainance-list/:id',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    p_id = req.params.id
    value = [user_id,p_id] 
    db.query("CALL get_landlord_maintainance_request(?,?)",
    value, function (err, result) {   
       if (err) throw err; 
       res.render('landlord_maintainance',
        { 
       title1: 'Landlord Maintainance',
       property_data: result[0],
       maintainance_list_data: result[1]
      })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   router.get('/landlord-maintainance-list',(req,res) => {
    if (req.session.loggedin) {
        p_id = req.query.p
        console.log(p_id)
         res.render('new-maintainance-request', { title1: 'Maintainance', id: p_id}) 
        }
      else {
        res.send('Please login to view this page!');
      }
     }) 
     
  
         
     router.get('/get-landlord-maintainance-details/:id',(req,res) => {
      if (req.session.loggedin) {

        id = req.params.id;
        console.log(id)

        //sql = 'select * from maintainance where m_id = ?'       
        db.query("CALL landlord_maintainance_details(?);", [id], function (err, result) {   
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
          

           res.render('landlordMaintainanceDetails',
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



       router.post('/send-landlord-comment/:id',(req,res) => {
        if (req.session.loggedin) {

          m_id = req.params.id
          m_id2 = req.params.id
          comment = req.body.comment
      
          value = [m_id,comment] 
          db.query("CALL landlord_new_comment(?,?)", value, function (err, result) {   
             if (err) throw err; 
             console.log(result[0])
             
             res.redirect(`/get-landlord-maintainance-details/${m_id2}`)
           })
          } 
          else {
            res.send('Please login to view this page!');
          }
         })


   module.exports = router;