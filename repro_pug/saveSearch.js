require('dotenv').config();
var cron = require('node-cron');
var schedule = require('node-schedule');
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const bodyparser = require('body-parser')
const { check,validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');





router.get('/save-search/:id', function(req, res, next) {
  max_id = req.params.id
 //res.render('saveSearch', {title: 'Save Search', max_id:max_id});
 res.send( {title: 'Save Search', max_id:max_id});
}); 

/* Save Search */
/* router.post('/save-search/:id',(req,res) => {
  if (req.session.loggedin) {
 
  max_id =  req.params.id 
  user_id = req.session.userid

// res.send('Search saved')    

res.render('saveSearch',
{ 
title1: 'Save Search',
max_id: max_id,
//data: result[0]
}) 



  } 
  else {
    res.send('Please login to save your search');
  }  
 }); */




 router.post('/save-name/:id',(req,res) => {
  if (req.session.loggedin) {

  max_s_id = req.params.id
  user_id = req.session.userid
  save_name = req.body.search_name

  value = [max_s_id,user_id,save_name]

db.query("CALL save_name(?,?,?)", value, function (err, result){
    if (err) throw err; 

 res.redirect('/get-save-search')     

}) 

  } 
  else {
    res.send('Please login to save your search');
  }  
 });



 router.get('/get-save-search',(req,res) => {
  if (req.session.loggedin) {

    user_id = req.session.userid
    value = [user_id]

db.query("CALL get_save_search(?)", value, function (err, result){
    if (err) throw err; 

    res.render('getSaveSearch',
    { 
    title1: 'get Save Search',
    data: result[0]
    })     

}) 

  } 
  else {
    res.send('Please login to save your search');
  }  
 });


 router.get('/edit-save-name/:id', function(req, res, next) {
  id = req.params.id;
  db.query("CALL get_save_name(?)", [id], function (err, result){
    if (err) throw err; 
    console.log(result[0])
    res.render('editName',
    { 
    title1: 'Edit Name',
    data: result[0]
    })     
}) 
});



router.post('/edit/:id', function(req, res, next) {
  search_name = req.body.search_name;
  id = req.params.id;

  db.query("CALL save_name(?,?)", [id,search_name], function (err, result){
    if (err) throw err; 

    res.redirect('/get-save-search')     
}) 
});




router.get('/delete/:id', function(req, res){
  id = req.params.id;
  value = [id]
  db.query("CALL delete_save_search(?)", value, function (err, result){
    if (err) throw err; 

    res.redirect('/get-save-search')     
}) 
});


  /*delete product*/
  router.get('/deleted/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    var sql = `DELETE FROM saved_search WHERE search_id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/get-save-search');
    });
  });



  router.get('/retreive-search/:id',(req,res) => {
    if (req.session.loggedin) {
  
      id = req.params.id;
      console.log(id)
      value = [id]
      user_id = req.session.userid
      value2 = [user_id]       
  
  db.query("CALL select_retreive_search(?)", value, function (err, result){
      if (err) throw err; 
   /*   console.log(result[0][0].v_location_out)
      console.log(result[0][0].v_prop_type_out)
      console.log(result[0][0].v_min_price_out)
      console.log(result[0][0].v_max_price_out)
      console.log(result[0][0].v_bed_out)
      console.log(result[0][0].v_bath_out)
      console.log(result[0][0].v_purpose_out) */

     //values = [result[0][0].v_location_out, result[0][0].v_prop_type_out, result[0][0].v_min_price_out, result[0][0].v_max_price_out, 
     //result[0][0].v_bed_out, result[0][0].v_bath_out, result[0][0].v_purpose_out]


     location = result[0][0].v_location_out
     property_type = result[0][0].v_prop_type_out
     min = result[0][0].v_min_price_out
     max = result[0][0].v_max_price_out
     bed = result[0][0].v_bed_out
     bath = result[0][0].v_bath_out
     purpose = result[0][0].v_purpose_out
     value1 = [location,property_type,min,max,bed,bath,purpose]
     db.query("CALL search_filter_special(?,?,?,?,?,?,?)", value1, function (err, result1){
         if (err) throw err; 
        // console.log(result1[0])
        // console.log(result1[1])
        // console.log(result1[2])
     
     
      res.render('searchResult',
      { 
     title1: 'Search Result',
     data: result1[0],
     data2: result1[1],
     data3: result1[2]
     })        
     })   
     
})
  
    } 
    else {
      res.send('Please login to view this page');
    }  
   });


 module.exports = router;
 
 
 
