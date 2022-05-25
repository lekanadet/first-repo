const express = require('express')
var app = express()



var upload6Router = require('./upload6')

app.use('/',  upload6Router);

app.listen(3000,function(){
  console.log("Working on port 3000");
});