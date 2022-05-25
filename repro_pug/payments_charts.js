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

  



router.get('/get-payment-charts',(req,res) => {
  if (req.session.loggedin) {
    user_id = req.session.userid
    value = [user_id,null,null] 
    db.query("CALL payment_charts(?,?,?)",
    value, function (err, result) {   
       if (err) throw err;
       console.log(result[0]),
       console.log(result[1]),
       console.log(result[2]),
       console.log(result[3]),
       console.log(result[4]),
       console.log(result[5]),
       console.log(result[6]),
       console.log(result[7]),
       console.log(result[8]),
       console.log(result[9]),
       console.log(result[10]),
       console.log(result[11]),
       console.log(result[12]),
       console.log(result[13]),
       console.log(result[14]),
       console.log(result[15]),
       console.log(result[16]),
       console.log(result[17]),
       console.log(result[18]),
       console.log(result[19]),
       console.log(result[20]),
       console.log(result[21]),
       console.log(result[22]),
       console.log(result[23]),
       console.log(result[24]),
       console.log(result[25]),
       console.log(result[26]),
       console.log(result[27]),
       console.log(result[28])
       res.render('payments_chart',
        { 
       title1: 'Landlord Payments',
       property_data: result[0],
       january_income: result[1],
january_charges: result[2],
february_income: result[3],
february_charges: result[4],
march_income: result[5],
march_charges: result[6],
april_income: result[7],
april_charges: result[8],
may_income: result[9],
may_charges: result[10],
june_income: result[11],
june_charges: result[12],
july_income: result[13],
july_charges: result[14],
august_income: result[15],
august_charges: result[16],
september_income: result[17],
september_charges: result[18],
october_income: result[19],
october_charges: result[20],
november_income: result[21],
november_charges: result[22],
december_income: result[23],
december_charges: result[24],
total_income: result[25],
total_charges: result[26],
income_breakdown: result[27],
charges_breakdown: result[28]
      })
     })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   router.get('/get-income-payments',(req,res) => {
    if (req.session.loggedin) {
      user_id = req.session.userid
      value = [user_id] 
      db.query("CALL get_income_payments(?)",
      value, function (err, result) {   
         if (err) throw err;
         console.log(result[0]),
        
         res.render('payments_chart',
          { 
         income: result[0],
         
        })
       })
      } 
      else {
        res.send('Please login to view this page!');
      }
     }) 


     router.get('/get-charges-payments',(req,res) => {
      if (req.session.loggedin) {
        user_id = req.session.userid
        value = [user_id] 
        db.query("CALL get_charges_payments(?)",
        value, function (err, result) {   
           if (err) throw err;
           console.log(result[0]),
          
           res.render('payments_chart',
            { 
           charges: result[0],
           
          })
         })
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 


       router.get('/get-property-payment-charts/:id',(req,res) => {
        if (req.session.loggedin) {
          user_id = req.session.userid
          p_id = req.params.id
          value = [user_id,p_id]
          values = [user_id,p_id,null] 
          db.query("CALL payment_charts(?,?,?)",
          values, function (err, result) {   
             if (err) throw err;
             console.log(result[0]),
       console.log(result[1]),
       console.log(result[2]),
       console.log(result[3]),
       console.log(result[4]),
       console.log(result[5]),
       console.log(result[6]),
       console.log(result[7]),
       console.log(result[8]),
       console.log(result[9]),
       console.log(result[10]),
       console.log(result[11]),
       console.log(result[12]),
       console.log(result[13]),
       console.log(result[14]),
       console.log(result[15]),
       console.log(result[16]),
       console.log(result[17]),
       console.log(result[18]),
       console.log(result[19]),
       console.log(result[20]),
       console.log(result[21]),
       console.log(result[22]),
       console.log(result[23]),
       console.log(result[24]),
       console.log(result[25]),
       console.log(result[26]),
       console.log(result[27]),
       console.log(result[28])
            
             res.render('payments_chart',
              { 
                property_data: result[0],
                january_income: result[1],
         january_charges: result[2],
         february_income: result[3],
         february_charges: result[4],
         march_income: result[5],
         march_charges: result[6],
         april_income: result[7],
         april_charges: result[8],
         may_income: result[9],
         may_charges: result[10],
         june_income: result[11],
         june_charges: result[12],
         july_income: result[13],
         july_charges: result[14],
         august_income: result[15],
         august_charges: result[16],
         september_income: result[17],
         september_charges: result[18],
         october_income: result[19],
         october_charges: result[20],
         november_income: result[21],
         november_charges: result[22],
         december_income: result[23],
         december_charges: result[24],
         total_income: result[25],
         total_charges: result[26],
         income_breakdown: result[27],
         charges_breakdown: result[28]
             
            })
           })
          } 
          else {
            res.send('Please login to view this page!');
          }
         }) 



         router.get('/get-yearly-payment-charts/:id',(req,res) => {
          if (req.session.loggedin) {
            user_id = req.session.userid
            y_id = req.params.id
            value = [user_id,y_id]
            values = [user_id,null,y_id] 
            db.query("CALL payment_charts(?,?,?)",
            values, function (err, result) {   
               if (err) throw err;
               console.log(result[0]),
         console.log(result[1]),
         console.log(result[2]),
         console.log(result[3]),
         console.log(result[4]),
         console.log(result[5]),
         console.log(result[6]),
         console.log(result[7]),
         console.log(result[8]),
         console.log(result[9]),
         console.log(result[10]),
         console.log(result[11]),
         console.log(result[12]),
         console.log(result[13]),
         console.log(result[14]),
         console.log(result[15]),
         console.log(result[16]),
         console.log(result[17]),
         console.log(result[18]),
         console.log(result[19]),
         console.log(result[20]),
         console.log(result[21]),
         console.log(result[22]),
         console.log(result[23]),
         console.log(result[24]),
         console.log(result[25]),
         console.log(result[26]),
         console.log(result[27]),
         console.log(result[28])
              
               res.render('payments_chart',
                { 
                  property_data: result[0],
                  january_income: result[1],
           january_charges: result[2],
           february_income: result[3],
           february_charges: result[4],
           march_income: result[5],
           march_charges: result[6],
           april_income: result[7],
           april_charges: result[8],
           may_income: result[9],
           may_charges: result[10],
           june_income: result[11],
           june_charges: result[12],
           july_income: result[13],
           july_charges: result[14],
           august_income: result[15],
           august_charges: result[16],
           september_income: result[17],
           september_charges: result[18],
           october_income: result[19],
           october_charges: result[20],
           november_income: result[21],
           november_charges: result[22],
           december_income: result[23],
           december_charges: result[24],
           total_income: result[25],
           total_charges: result[26],
           income_breakdown: result[27],
           charges_breakdown: result[28]
               
              })
             })
            } 
            else {
              res.send('Please login to view this page!');
            }
           }) 



           router.get('/get-all-payment-charts/:id',(req,res) => {
            if (req.session.loggedin) {
              user_id = req.session.userid
              v_id = req.params.id
              y_id = req.params.id
              values = [user_id,v_id,y_id] 
              db.query("CALL payment_charts(?,?,?)",
              values, function (err, result) {   
                 if (err) throw err;
                 console.log(result[0]),
           console.log(result[1]),
           console.log(result[2]),
           console.log(result[3]),
           console.log(result[4]),
           console.log(result[5]),
           console.log(result[6]),
           console.log(result[7]),
           console.log(result[8]),
           console.log(result[9]),
           console.log(result[10]),
           console.log(result[11]),
           console.log(result[12]),
           console.log(result[13]),
           console.log(result[14]),
           console.log(result[15]),
           console.log(result[16]),
           console.log(result[17]),
           console.log(result[18]),
           console.log(result[19]),
           console.log(result[20]),
           console.log(result[21]),
           console.log(result[22]),
           console.log(result[23]),
           console.log(result[24]),
           console.log(result[25]),
           console.log(result[26]),
           console.log(result[27]),
           console.log(result[28])
                
                 res.render('payments_chart',
                  { 
                    property_data: result[0],
                    january_income: result[1],
             january_charges: result[2],
             february_income: result[3],
             february_charges: result[4],
             march_income: result[5],
             march_charges: result[6],
             april_income: result[7],
             april_charges: result[8],
             may_income: result[9],
             may_charges: result[10],
             june_income: result[11],
             june_charges: result[12],
             july_income: result[13],
             july_charges: result[14],
             august_income: result[15],
             august_charges: result[16],
             september_income: result[17],
             september_charges: result[18],
             october_income: result[19],
             october_charges: result[20],
             november_income: result[21],
             november_charges: result[22],
             december_income: result[23],
             december_charges: result[24],
             total_income: result[25],
             total_charges: result[26],
             income_breakdown: result[27],
             charges_breakdown: result[28]
                 
                })
               })
              } 
              else {
                res.send('Please login to view this page!');
              }
             }) 
  



   module.exports = router;