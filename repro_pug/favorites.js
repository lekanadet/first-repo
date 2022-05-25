require('dotenv').config();
const path = require('path')
const express = require('express')
var router = express.Router();
var db = require('./database/db2.js');




   router.get('/favorited/:id',(req,res) => {
    id = req.params.id
    user_id = req.session.userid
    
    values = [id,user_id]
    db.query("CALL insert_favorite(?)",[values], function (err, result) {   
       if (err) throw err; 
        res.send('Property added to favorites')
      // res.redirect('/tenant-home')
     })
   }) 

   router.get('/unfavorited/:id',(req,res) => {
    id = req.params.id
    user_id = req.session.userid
    
    values = [id,user_id]
    db.query("CALL delete_favorite(?)",[values], function (err, result) {   
       if (err) throw err; 
       res.send('Property deleted from your saves properties')
      // res.redirect('/tenant-home')
     })
   }) 


   router.get('/favorites',(req,res) => {
    if (req.session.loggedin) {
      id = req.session.userid
    db.query("CALL get_favorite(?)", [id], function (err, result) {   
       if (err) throw err; 
       res.render('favorites',
       { 
        title1: 'Favorites',
        data: result[0]
       })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   module.exports = router;