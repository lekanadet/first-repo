var express = require('express');
var router = express.Router();

// Home page route.

router.get('/index2', function (req, res) { 
    res.send('Home page of Test Page');
})

router.route('/') 
  .get(function (req, res) { 
      res.send('Home page Check');
})

// About page route.
router.route('/about')
.get(function (req, res) {
  res.send('About this wiki');
})

module.exports = router;