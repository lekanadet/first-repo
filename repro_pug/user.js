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


router.get('/2',(req,res) => {
 
  db.query("CALL get_homepage_info()",
  [1,2], function (err, rows) {   
     if (err) throw err; 
     res.send({ 

     title1: 'Pictures',
     Pictures: rows[0], 
    
     title2: 'Video',
     video: rows[1], 

     title3: 'Comments',
     Comment1: rows[2]

    })
   })
}) 

/* Homepage route */
router.get('/',(req,res) => {
  if (req.session.loggedin) { 
    console.log(req.session)
    console.log(req.session.cookie)
    console.log('Cookies: ', req.cookies)
    console.log('Cookies: ', req.cookies.userId)
   db.query("CALL get_homepage_info()",
   [1,2], function (err, rows) {   
      if (err) throw err; 
      res.render('index2',
       { 
      name: 'Welcome , ' + req.session.firstname,   
      title1: 'Pictures',
      Pictures: rows[0], 
    
      title2: 'Video',
      Video: rows[1], 

      title3: 'Comments',
      Comment: rows[2] 
     })
    })
  }
  else {
		res.send('Please login to view this page!');
	}
  }) 

/* Homepage route */
router.get('/original',(req,res) => {
  if (req.session.loggedin) { 
    console.log(req.session)
    console.log(req.session.cookie)
    console.log('Cookies: ', req.cookies)
    console.log('Cookies: ', req.cookies.userId)
   db.query("CALL select_property_pictures();CALL select_comment();CALL select_video();CALL select_agents();",
   [1,2], function (err, rows) {   
      if (err) throw err; 
      res.render('index',
       { 
      name: 'Welcome , ' + req.session.username,   
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
  }
  else {
		res.send('Please login to view this page!');
	}
  }) 


    /*Register Landlord routes */
    router.get('/register-form-user', function(req, res, next) {
      res.render('register-user', {title: 'Register User'});
    });


  /* Register User task */
  router.post('/register-user',[

    check('firstname')
    .not()
    .isEmpty()
    .withMessage('Firstname is required'),
    check('lastname')
    .not()
    .isEmpty()
    .withMessage('Lastname is required'),
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email'),
    check('email')
    .custom(async email => {
       const value = await isEmailInUse(email);
       if (value) {
        throw new Error('Email is already in Use!!!');
        
    }
  }),
    check('phone_no')
    .not()
    .isEmpty()
    .withMessage('Phone number is required')
    .custom(async phone_no => {
      const value = await isPhoneInUse(phone_no);
      if (value) {
       throw new Error('Phone number already in use!!!');
       
   }
 }),
 check('password')
 .not()
 .isEmpty()
 .withMessage('Password is required')

 ], 
     function(req, res, next) {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(422).json( errors.errors[0].msg );
        } 
        else{

          function randomNumber() {
            return Math.floor(100000 + Math.random() * 900000);
          }

          
          
       console.log(req.body.firstname)
       firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const phone_no = req.body.phone_no;
      const account_type = req.body.account_type;
      const password = req.body.password;
      const secret = randomNumber()
    

var values = [firstname,lastname,email,phone_no,account_type,password,secret]

db.query("CALL add_user(?,?,?,?,?,?,?)",values, function (err, result){
  if (err) throw err;




// Step 1
const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD
}
});

// Step 2
transporter.use('compile', hbs({
viewEngine:{layoutsDir: __dirname + "/views/layouts",
extname: ".handlebars"},
viewPath: './views/'

}));
/*
viewEngine: {
partialsDir: __dirname + "/views/partials",
layoutsDir: __dirname + "/views/layouts",
extname: ".hbs"  
}   */

// Step 3
let mailOptions = {
from: "ladetutu@tts-nigeria.com", // TODO: email sender
to: email, // TODO: email receiver
subject: 'Email Verification',
text: 'IT works 3!!',
template:'index',
context: {
    name: firstname,
    secret: secret
} // send extra values to template
} 

console.log(mailOptions)


// Step 4
transporter.sendMail(mailOptions, (err, data) => {
if (err) {
    return console.log('Error occurs',err);
}
return console.log('Email sent!!!', data);
});      
                                                          
res.render('verify',{email:email})                          
                                                          
//res.send( 'take to verify page. in the verify page also have a link that calls the resend-undeleted api () to resend another code incase need be')
});
}
});



function isEmailInUse(email){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_email(?)", [email], function (err, result) {
          if(!err){
            //  console.log("EMAIL COUNT : "+result[0][0].v_result);
              return resolve(result[0][0].v_result === 1);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}

function isVerifiedValid(email){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_verify(?)", [email], function (err, result) {
          if(!err){
            //  console.log("EMAIL COUNT : "+result[0][0].v_result);
              return resolve(result[0][0].v_result === 0);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}

function isPhoneInUse(phone_no){
  return new Promise((resolve, reject) => {
    db.query("CALL select_check_phone_no(?)", [phone_no], function (err, result) {
          if(!err){
            //  console.log("EMAIL COUNT : "+result[0][0].v_result);
              return resolve(result[0][0].v_result === 1);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}

   /* Verification form route */
   router.get('/verify-form', function(req, res, next) {
    res.render('verify', {title: 'Verify'});
  });


/* Email verification task */
   router.post('/verify/:id', (req,res) => {
    
    email = req.params.id
    secret = req.body.secret
    message = ' Secret Key has expired'

    db.query("CALL select_check_secret(?,?);", [email,secret], function (err, result){
      if (err) throw err; 
      if (result[0][0].v_out === 0) {
        return res.send("wrong code entered give option to request for another code is they did not get the token")
      } 
      if (result[0][0].v_out === 1) { 

        db.query("CALL select_check_token_expiry(?,?);", [email,secret], function (err, result){
          if (err) throw err; 
          if (result[0][0].v_out === 0) {
            db.query("CALL effect_expired_token(?,?);",[email,secret], function (err, result){
              if (err) throw err; 
              //return res.send("Secret Key has expired please resend another one")
            return res.render('resend-undeleted',{email:email,message:message})
            })

          } 
          else if (result[0][0].v_out === 1) {
            db.query("CALL update_status(?,?);",[email,secret], function (err, result){
              if (err) throw err; 
            //return res.send("Email verified send to Login")
            return res.redirect('/login-form')
            })
          }
  })
}
})
  })  

  router.post('/verify/:id2', (req,res) => {
    
    email = req.params.id
    secret = req.body.secret
    message = ' Secret Key has expired'

    db.query("CALL select_check_secret(?,?);", [email,secret], function (err, result){
      if (err) throw err; 
      if (result[0][0].v_out === 0) {
        return res.send("wrong code entered give option to request for another code is they did not get the token")
      } 
      if (result[0][0].v_out === 1) { 

        db.query("CALL select_check_token_expiry(?,?);", [email,secret], function (err, result){
          if (err) throw err; 
          if (result[0][0].v_out === 0) {
            db.query("CALL effect_expired_token(?,?);",[email,secret], function (err, result){
              if (err) throw err; 
              //return res.send("Secret Key has expired please resend another one")
            return res.render('resend-undeleted',{email:email,message:message})
            })

          } 
          else if (result[0][0].v_out === 1) {
            db.query("CALL update_status(?,?);",[email,secret], function (err, result){
              if (err) throw err; 
            
            // Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
  });
  
  // Step 2
  transporter.use('compile', hbs({
  viewEngine:{layoutsDir: __dirname + "/views/layouts",
  extname: ".handlebars"},
  viewPath: './views/'
  
  }));
  /*
  viewEngine: {
  partialsDir: __dirname + "/views/partials",
  layoutsDir: __dirname + "/views/layouts",
  extname: ".hbs"  
  }   */
  
  // Step 3
  let mailOptions = {
  from: 'sokoromi@tts-nigeria.com', // TODO: email sender
  to: email, // TODO: email receiver
  subject: 'Email Verification',
  text: 'IT works 3!!',
  template:'welcome',
  context: {
      name: firstname
  } // send extra values to template
  } 
  
  console.log(mailOptions)
  
  
  // Step 4
  transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return console.log('Error occurs',err);
  }
  return console.log('Email sent!!!', data);
  });    

            //return res.send("Email verified send to Login")
            return res.redirect('/login-form')
            })
          }
  })
}
})
  }) 



     /* Resend form route */
  router.get('/resend-form-undeleted/:id', function(req, res, next) {
       email = req.params.id
      res.render('resend-undeleted', {title: 'Resend-undeleted',email:email});
  }); 


    /* Resend secret key task for deleted secret key records*/
     router.post('/resend/undeleted/:id',(req,res) => {

       email = req.params.id

       db.query("CALL check_if_verified(?);",[email], function (err, result){
        if (err) throw err;
    
        if (result[0][0].v_status === 'verified') {
    
           return res.send('Your account has been verified please go ahead and login')
          //res.send('Please verify your email take to verify page')
        } 

        else if (result[0][0].v_status === 'unverified') {

       db.query("CALL select_get_firstname(?)", [email], function (err, result) {
        if(err) throw err;
        firstname = result[0][0].v_out 

 

     function randomNumber() {
      return Math.floor(100000 + Math.random() * 900000);
    }
 
          const secret = randomNumber()
          db.query("CALL resend_update_undeleted(?,?)", [email,secret], function (err, result) {
          if(err) throw err;

    // Step 1
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
  }
  });
  
  // Step 2
  transporter.use('compile', hbs({
  viewEngine:{layoutsDir: __dirname + "/views/layouts",
  extname: ".handlebars"},
  viewPath: './views/'
  
  }));
  
  // Step 3
  let mailOptions = {
  from: "ladetutu@tts-nigeria.com", // TODO: email sender
  to: email, // TODO: email receiver
  subject: 'Email Verification',
  text: 'IT works 3!!',
  template:'index',
  context: {
      name: firstname,
      secret: secret
  } // send extra values to template
  } 
  
  console.log(mailOptions)
  
  
  // Step 4
  transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return console.log('Error occurs',err);
  }
  return console.log('Email sent!!!');
  });
 // res.redirect('verify-form')
  //res.send('take to verify page. Please enter the email verification code sent to your email')
  res.render('verify',{email:email})
})
        
  
  })
}
       })
})


  

   /* Login route */
router.get('/login-form', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

/* Login task */
router.post('/login',[

  check('email')
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .custom(async email => {
    const value = await isVerifiedValid(email);
    if (value) {
     throw new Error('Email has not been verified, please verify email. At login the system checks if email has been verified so for this bring up a link to take them to the verify-form page')
    } 
   }) ,
  check('password')
  .not()
  .isEmpty()
  .withMessage('Password is required')
],

function(req, res, next) {
email = req.body.email

      db.query("CALL select_authentication(?,?);",[req.body.email,req.body.password], function (err, result){
        if (err) throw err;
      
        if (result[0][0].c === 1) {


          //return res.redirect('/')

          db.query("CALL select_check_verify(?);",[req.body.email], function (err, result){
            if (err) throw err;
        
            if (result[0][0].v_result === 0) {
        
               return res.render('verify',{message1:'Please verify your email before you can log into your account',email:email,message2:'Secret key is only valid for 10 mins input secret key below or request for a new one'})
              //res.send('Please verify your email take to verify page')
            } 
        else if (result[0][0].v_result === 1) {


          
          req.session.loggedin = true;
          req.session.email = email
          db.query("CALL select_get_firstname_user_id(?);",[req.session.email], function (err, result){
            if (err) throw err;
            
            req.session.username = result[0][0].v_out1;
            req.session.userid = result[0][0].v_out2;
           // req.session.propid = result[0][0].v_out3;
          
          return res.redirect('/')
          //return res.send('Successful take them to the homepage')
          })
          }
        
      })
      }  else if (result[0][0].c === 0) {
        res.send('Not Successful stay on that page so they can try another password on this page create a link that will call the forget-password api.')  
      }
  });

})


    
/* Set new Password Route */
router.get('/setPassword-form/:id', function(req, res, next) {
  email = req.params.id
  res.render('setPassword', {title: 'Set Password',email:email});
});

/* Update password task */
router.post('/updatePassword/:id', function(req, res, next) {

  email = req.params.id
  password = req.body.password

  db.query("CALL update_password(?,?);",[email,password], function (err, result){
    if(err) throw err
    else return res.render('login',{resetMessage:'Login with your new password'})
  })

});
    /* forget password Route */
    router.get('/forgot-password-form', function(req, res, next) {
      res.render('forgot-password', {title: 'Forget Password'});
    });


     /* forget password task check if email exists and send a password reset link */
    router.post('/forgot-password', function(req, res, next) {
      
      email = req.body.email

      db.query("CALL select_check_email(?);",[email], function (err, result){
       if (err) throw err;

    if (result[0][0].v_result === 0) {
      return res.send('No account is associated with the email supplied')
    }

    db.query("CALL select_get_firstname(?)", [email], function (err, result) {
      if(err) throw err;
      firstname = result[0][0].v_out 

    // Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
 }
 });
 
 // Step 2
 transporter.use('compile', hbs({
 viewEngine:{layoutsDir: __dirname + "/views/layouts",
 extname: ".handlebars"},
 viewPath: './views/'
 
 }));
 /*
 viewEngine: {
 partialsDir: __dirname + "/views/partials",
 layoutsDir: __dirname + "/views/layouts",
 extname: ".hbs"  
 }   */
 
 // Step 3
 let mailOptions = {
 from: 'sokoromi@tts-nigeria.com', // TODO: email sender
 to: email, // TODO: email receiver,
 subject: 'Password Reset',
 text: 'IT works 3!!',
 template:'forgot-password',
 context: {
    name: firstname,
    email:email,
    url:`http://localhost:2000/setPassword-form/${email}`
 } // send extra values to template
 } 
 
 console.log(mailOptions)
 
 
 // Step 4  

 
 transporter.sendMail(mailOptions, (err, data) => {
 if (err) {
    return console.log('Error occurs',err);
 }
 return console.log('Email sent!!!');
 });

//task.destroy
 res.send('A password reset link has been sent to your email')
});
      })
    });


        /* Property Alert Route */
        router.get('/property-alert-form', function(req, res, next) {
          res.render('property-alert', {title: 'Property Alert'});
        });



     /* Property Alert task check if email exists and send a password reset link */
     router.post('/property-alert', function(req, res, next) {

      name = req.body.name
      email = req.body.email
      phone_no = req.body.phone_no
      property_type = req.body.property_type
      year = req.body.year
      month = req.body.month
      day = req.body.day
      dash1 = "-"
      dash2 = "-"
      date1 = year.concat(dash1,month)
      date2 = date1.concat(dash2,day)
      js_year = Number(year)
      js_month = Number(month - 1)
      js_day = Number(day)

      var values = [name,email,phone_no,property_type,date2]

      db.query("CALL select_add_property_alert(?,?,?,?,?);",values, function (err, result){
       if (err) throw err;
       var alert_id = result[0][0].v_alert

    // Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
 }
 });
 
 // Step 2
 transporter.use('compile', hbs({
 viewEngine:{layoutsDir: __dirname + "/views/layouts",
 extname: ".handlebars"},
 viewPath: './views/'
 
 }));
 /*
 viewEngine: {
 partialsDir: __dirname + "/views/partials",
 layoutsDir: __dirname + "/views/layouts",
 extname: ".hbs"  
 }   */



 // Step 3
 let mailOptions = {
 from: 'sokoromi@tts-nigeria.com', // TODO: email sender
 to: email, // TODO: email receiver,
 subject: 'Property Alert Notification',
 text: 'IT works 3!!',
 template:'property-alert',
 context: {
    name: name,
    year: js_year,
    month:js_month,
    day: js_day
 } // send extra values to template
 } 

 
 console.log(mailOptions)

 
 // Step 4
 //var task = cron.schedule('*/30 * * * * *', () =>  {
  var date = new Date(year, js_month, day, 16, 40, 0);
 schedule.scheduleJob(date, () =>  {
 transporter.sendMail(mailOptions, (err, data) => {
 if (err) {
    return console.log('Error occurs',err);
 }
 db.query("CALL update_notification(?);",[alert_id], function (err, result){
  if (err) throw err;
 return console.log('Email sent!!!');
 });
 });
});
//task.destroy
 res.send('Notification sent')
      })
    });




  
  module.exports = router;
  

