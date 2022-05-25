const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
const hbs = require('hbs')
var db = require('./db2.js');
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({
    extended: false
 })); 

app.use(bodyparser.json())

/* Hello world display route */
app.get('/hello',(req,res) => {
  res.json('Welcome to Elastic BeanStalk Node js App Deployment')
})

/* Homepage route */
router.get('/',(req,res) => {

   db.query("CALL select_property_pictures();CALL select_comment();CALL select_video();CALL select_agents();",
   [1,2], function (err, rows) {   
      if (err) throw err; 
      res.render('index',
       { 
      title1: 'Pictures',
      picture1: rows[0][0].a,
      picture2: rows[0][0].b,
      picture3: rows[0][0].c, 

      title2: 'Video',
      video: rows[4][0].a, 

      title3: 'Comments',
      Rating1: rows[2][0].v_rating1,
      Comment1 : rows[2][0].v_comment1,
      Name1 : rows[2][0].v_name1,
      
      Rating2: rows[2][0].v_rating2,
      Comment2 : rows[2][0].v_comment2,
      Name2 : rows[2][0].v_name2,

      Rating3: rows[2][0].v_rating3,
      Comment3 : rows[2][0].v_comment3,
      Name3 : rows[2][0].v_name3,

      title4: 'Agents',
      NameofAgent1: rows[6][0].v_name1,
      ReproNo1: rows[6][0].v_repro_no1,
      AgentRole1: rows[6][0].v_role1,
      AgentPictureUrl1: rows[6][0].v_url1,

      NameofAgent2: rows[6][0].v_name2,
      ReproNo2: rows[6][0].v_repro_no2,
      AgentRole2: rows[6][0].v_role2,
      AgentPictureUrl2: rows[6][0].v_url2,

      NameofAgent3: rows[6][0].v_name3,
      ReproNo3: rows[6][0].v_repro_no3,
      AgentRole3: rows[6][0].v_role3,
      AgentPictureUrl3: rows[6][0].v_url3   
     })
    })
  }) 

  
 /* To do Homepage task i.e post property alert */


  /*Testing Register route */
  router.get('/register-form', function(req, res, next) {
    res.render('register', {title: 'Register'});
  });

  /* Register task */
  router.post('/register', function(req, res, next) {
    var values = [req.body.email,req.body.password];  
  
    db.query("CALL register(?,?)",values, function (err, result){
      if (err) throw err;
      res.redirect('/register-form');
    });
  });

  /*Register Landlord routes */
  router.get('/register-form-landlord', function(req, res, next) {
    res.render('register-landlord', {title: 'Register Landlord'});
  });

  router.get('/register-form-landlord-error', function(req, res, next) {
    res.render('register-landlord-error', {title: 'Register Landlord Error'});
  });


  router.get('/register-landlord-success', function(req, res, next) {
    res.render('register-landlord-successful', {title: 'Register Landlord Success'});
  });


  /* Register Landlord task */
  router.post('/register-landlord', function(req, res, next) {
    var values = [req.body.firstname, req.body.lastname, req.body.email, req.body.phone_no, req.body.password];  
  
    db.query("CALL select_add_landlord(?,?,?,?,?)",values, function (err, result){
      if (err) throw err;
  
      if (result[0][0].v_error !== null){
          res.redirect('/register-form-landlord-error')
      }
      else if (result[0][0].v_error === null){
      res.redirect('/register-landlord-success')
      }
    });
  });

    /*Register Tenant routes */
    router.get('/register-form-tenant', function(req, res, next) {
      res.render('register-tenant', {title: 'Register Tenant'});
    });
  
    router.get('/register-form-tenant-error', function(req, res, next) {
      res.render('register-tenant-error', {title: 'Register Tenant Error'});
    });
  
    router.get('/register-tenant-success', function(req, res, next) {
      res.render('register-tenant-successful', {title: 'Register Tenant Success'});
    });

      /* Register Tenant task */
  router.post('/register-tenant', function(req, res, next) {
    var values = [req.body.firstname, req.body.lastname, req.body.email, req.body.phone_no, req.body.password];  
  
    db.query("CALL select_add_tenant(?,?,?,?,?)",values, function (err, result){
      if (err) throw err;
  
      if (result[0][0].v_error !== null){
          res.redirect('/register-form-tenant-error')
      }
      else if (result[0][0].v_error === null){
      res.redirect('/register-tenant-success')
      }
    });
  });




/*Register Seller routes */
router.get('/register-form-seller', function(req, res, next) {
  res.render('register-seller', {title: 'Register Seller'});
});

router.get('/register-form-seller-error', function(req, res, next) {
  res.render('register-seller-error', {title: 'Register Seller Error'});
});

router.get('/register-seller-success', function(req, res, next) {
  res.render('register-seller-successful', {title: 'Register Seller Success'});
});

  /* Register Seller task */
router.post('/register-seller', function(req, res, next) {
var values = [req.body.firstname, req.body.lastname, req.body.email, req.body.phone_no, req.body.password];  

db.query("CALL select_add_seller(?,?,?,?,?)",values, function (err, result){
  if (err) throw err;

  if (result[0][0].v_error !== null){
      res.redirect('/register-form-seller-error')
  }
  else if (result[0][0].v_error === null){
  res.redirect('/register-seller-success')
  }
});
});




/* Login route */
router.get('/login-form', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

/* Login task */
router.post('/login', function(req, res, next) {
    db.query("CALL authentication(?,?,@output);",[req.body.email,req.body.password], function (err, result){
      if (err) throw err;  
      db.query("CALL select_authentication(?,?);",[req.body.email,req.body.password], function (err, result){
        if (err) throw err;
      
        if (result[0][0].c === 1) {
        res.redirect('/')
      } else if (result[0][0].c === 0) {
        res.redirect('/login-form')
         
      }
  
    });
  });
});


  
  
  /*update product*/
  router.get('/edit-form/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = `SELECT * FROM products WHERE id=${id}`;
    db.query(sql, function(err, rows, fields) {
        res.render('editform', {title: 'Edit Product', product: rows});
    });
  });

  
  router.post('/edit/:id', function(req, res, next) {
    var product_name = req.body.product_name;
    var sku = req.body.sku;
    var price = req.body.price;
    var id = req.params.id;
    var sql = `UPDATE products SET product_name="${product_name}", sku="${sku}", price="${price}" WHERE id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record updated!');
      res.redirect('/');
    });
  });
  
  /*delete product*/
  router.get('/delete/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    var sql = `DELETE FROM products WHERE product_id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/');
    });
  });
  
  module.exports = router;
  
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
//hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.use(router)

app.listen(2000,() => {
    console.log("server is up on port 2000")
})
