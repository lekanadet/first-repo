require('dotenv').config();
const express = require('express')
var router = express.Router();
var db = require('./database/db2.js');
const { check,validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const userMiddleware = require('./middleware/users.js');
const validateLoginMiddleware = require('./middleware/validate_login.js');
const sgMail = require('@sendgrid/mail')




/* Login route */
router.get('/login-form2', function(req, res, next) {
    res.render('login2', {title: 'Login2'});
  });
  
  /* Login task */
router.post('/login2345',[
  
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
            console.log(email)
            console.log(result[0][0].v_result)
            console.log(result[1][0].v_user_id)
            console.log(result[2][0].v_user_type)
            console.log(result[3][0].v_firstname)
            
            const token = jwt.sign({
              email: req.body.email,
              userId: result[1][0].v_user_id
            },
            'asdf;lkjh3lkjh235l23h5l235kjh', {
              expiresIn: '1h'
            }
          );
  
          res.send({
            msg: 'Logged in!',
            email: email,
            token,
            user_id: result[1][0].v_user_id, 
            firstname: result[3][0].v_firstname,
            usertype:  result[2][0].v_user_type
          });
            }
          
        })
        }  else if (result[0][0].c === 0) {
          res.send('Not Successful stay on that page so they can try another password on this page create a link that will call the forget-password api.')  
        }
    });
  
  })


router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });


router.get('/secret-route2', (req, res, next) => {
    

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'asdf;lkjh3lkjh235l23h5l235kjh'
      );
      req.userData = decoded;
      
      if (req.userData){
        console.log(req.userData);
        res.send('This is the secret content. You can see this page cause yoou are logged in');
      }
    } catch (err) {
      return res.send({
        msg: 'This page is protected please log in to view this page!'
      });
    }  
      

    
  });


router.post('/bdt-login',[
  
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
  ],
  
  function(req, res, next) {
  email = req.body.email
  
        db.query("CALL bdt_authentication(?,?);",[req.body.email,req.body.password], function (err, result){
          if (err) throw err;
        
          if (result[0][0].v_result === 1) {

            
            const token = jwt.sign({
              email: req.body.email,
              Id: result[1][0].id,
              firstname: result[1][0].firstname,
              role:  result[1][0].role
            },
            process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_LIFE
            }
          );

          res.send({
            msg: 'Password Updated Successfully!',
            email: email,
            token,
            firstname: result[1][0].firstname,
            employee_Id: result[1][0].id,
            role: result[1][0].role
          });
            
        }  else if (result[0][0].v_result === 0) {
          res.send('Email or Password is Incorrect')  
        }
    });
  
  })


router.post('/shortlet-user-signup',validateLoginMiddleware.isLoggedIn,(req,res) => {

  if (req.userData) { 
    
    creator = req.userData.firstname
    firstname = req.body.firstname
    firstname2 = req.body.firstname
    lastname = req.body.lastname
    email = req.body.email
    phone_no = req.body.phone_no
    usertype = req.body.usertype

    value1 = [email,usertype]
    value2 = [firstname,lastname,email,phone_no,usertype,creator] 
   
    db.query("CALL check_user_email(?,?)",
    value1, function (err, result) {
     if (err) throw err; 
   
    if (result[0][0].v_result === 0) {

    db.query("CALL add_new_user(?,?,?,?,?,?)",
    value2, function (err, result) {   
       if (err) throw err; 

      password = result[0][0].v_password2

       sgMail.setApiKey(process.env.SENDGRID_API_KEY)
       const body = 'Your Account has been successfully created please use the link below to redirect you to the login page'
       const body2 = 'Below are your login details to have access to your Account'
       const url = 'https://realtesting.netlify.app/admin/live'
       const msg = {
         to: email, // Change to your recipient
         from: process.env.FROM_EMAIL2, // Change to your verified sender
        // templateId: 'd-4c8ce90b580f4ddf807abedf79499728',
         subject: 'Account Creation',
         text: body,
         html: 
         `<p>Hello ${firstname}</p>
         <br/>
         <p>${body}</p>
         <a href=${url}>https://realtesting.netlify.app/admin/live</a>
         <br/>
         <br/>
         <p>${body2}</p>
         <p>Email: ${email}</p>
         <p>Password: ${password}</p>`  
  
       }
       sgMail
         .send(msg)
         .then(() => {
           console.log('Email sent')
         })
         .catch((error) => {
           console.error(error)
         }) 

       
       res.send({
       title: 'Record Created'
      })
     })
    }
    else if (result[0][0].v_result === 1) {
      res.send('Record with this Email already exists')  
    }
  })
} 
else {
  res.send('Please login to view this page!');
}
})  




router.post('/agent-login',[
  
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
  ],
  
  function(req, res, next) {
  email = req.body.email
  
        db.query("CALL agent_authentication(?,?);",[req.body.email,req.body.password], function (err, result){
          if (err) throw err;
        
          if (result[0][0].v_result === 1) {

            
            const token = jwt.sign({
              email: req.body.email,
              firstname: result[1][0].firstname,
              role:  result[1][0].role,
              Id: result[1][0].id
            },
            process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_LIFE
            }
          );

          res.send({
            email: email,
            token,
            firstname: result[1][0].firstname,
            role: result[1][0].role,
            Id: result[1][0].id
          });
            
        }  else if (result[0][0].v_result === 0) {
          res.send('Email or Password is wrong')  
        }
    });
  
  })  


router.get('/log-out',validateLoginMiddleware.isLoggedIn,(req,res) => {
    if (req.userData) { 
      
      usertype = req.userData.role
      value = [usertype]

      db.query("CALL usertype_logout(?)", value, function (err, result) {   
        if (err) throw err; 

        res.send({
          usertype: result[0][0].usertype
        });



      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     })    


router.get('/bdt-update-password',validateLoginMiddleware.isLoggedIn,(req,res) => {
    if (req.userData) { 
      
      email = req.userData.email
      password = req.body.password
      value = [email,password]
      db.query("CALL bdt_update_password(?,?)", value, function (err, result) {   
        if (err) throw err; 
        res.send(
          'Password Updated Successfully'
        );
      })
      } 
      else {
        res.send('Please login to view this page!');
      }
     })   



  module.exports = router;