require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');



router.get('/agent-home',(req,res) => {
  if (req.session.loggedin) { 
    user_id = req.session.userid
    value = [user_id]
    db.query("CALL get_agent_property(?)", value, function (err, result) {   
      if (err) throw err; 
       res.render('agent_home',
        { 
       title1: 'Agent Home',
       data: result[0],
       name: req.session.username + ' Dashboard'
      })
    })
    } 
    else {
      res.send('Please login to view this page!');
    }
   }) 


   router.get('/agent-page',(req,res) => {
    if (req.session.loggedin) { 
      
      db.query("CALL get_agents_lists()", function (err, result) {   
        if (err) throw err; 
         res.render('agent_page',
          { 
         title1: 'Agent Page',
         data: result[0]
        })
      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     }) 


     router.get('/agent-details/:id',(req,res) => {
      if (req.session.loggedin) { 
        agent_id = req.params.id

        value = [agent_id]
        db.query("CALL get_agent_details(?)", value, function (err, result) {   
          if (err) throw err; 
           res.render('agent_details',
            { 
           title1: 'Agent Details',
           data: result[0],
           data2: result[1]
          })
        })
        } 
        else {
          res.send('Please login to view this page!');
        }
       }) 


   module.exports = router;