require('dotenv').config();
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');



router.get('/view-photo',(req,res) => {
  
    //res.sendFile('photo.html');
    res.sendFile(path.join(__dirname, '/photo.html'));
});
   


   module.exports = router;