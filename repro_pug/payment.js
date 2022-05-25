require('dotenv').config();
const { createInvoice } = require("./createReceipt.js");
const fs = require("fs");
const AWS = require('aws-sdk');
var rimraf = require("rimraf");
var cron = require('node-cron');
var schedule = require('node-schedule');
const path = require('path')
const express = require('express')
var app = express()
var router = express.Router();
var db = require('./database/db2.js');
const { check,validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const request = require('request');
const pug = require('pug');
const _ = require('lodash');
//const { response } = require('express');
const {initializePayment, verifyPayment} = require('./config/paystack')(request);       
const {encrypt, decrypt} = require('./encryption');
const {encrypt2, decrypt2} = require('./encryption2');
const {upload} = require('./imageserver')(request); 
const validateLoginMiddleware = require('./middleware/validate_login.js');
const { platform } = require('os');
const sgMail = require('@sendgrid/mail')
var crypto = require('crypto');
var secret = process.env.SECRET_KEY;





// Using Express
app.post("/my/webhook/url", function(req, res) {
    //validate event
    var hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    var event = req.body;
    console.log(event)
    // Do something with event  
    }
    res.send(200);
});




 /* Login route */ 
router.get('/login-form-pymt', function(req, res, next) {
  res.render('login_pymt', {title: 'Login'});
});


 /* Login task */
router.post('/login-pymt', function(req, res, next) {
       email =req.session.email

      db.query("CALL select_authentication(?,?);",[req.body.email,req.body.password], function (err, result){
        if (err) throw err;
      
        if (result[0][0].c === 1) {

          req.session.loggedin = true;
          req.session.email = req.body.email
          console.log(req.session.email) 
          db.query("CALL get_name_with_user_id(?);",[req.session.email], function (err, result){
            if (err) throw err;
            
            req.session.firstname = result[1][0].v_firstname;
            req.session.lastname = result[1][0].v_lastname;
            req.session.userid = result[0][0].v_user_id;
           // req.session.propid = result[0][0].v_out3;
          console.log(req.session.firstname)
          console.log(req.session.lastname)
          console.log(req.session.userid)
          return res.redirect('/')
          //return res.send('Successful take them to the homepage')
          })
      
      }  else if (result[0][0].c === 0) {
        res.send('Not Successful stay on that page so they can try another password on this page create a link that will call the forget-password api.')  
      }
  });
})


router.get('/index-pymt/:id',(req, res) => {

  if (req.session.loggedin) {
    
    var firstname = req.session.firstname
    var lastname =  req.session.lastname 
    var fullname =  firstname.concat(' ',lastname)
    //var fullname2 =  concat(fullname1,lastname)
    property_id = req.params.id
    value = [property_id] 
    console.log(firstname)
    console.log(lastname)
    console.log(fullname)
    db.query("CALL get_property_details2(?)",
    value, function (err, result) {   
       if (err) throw err;    
       console.log(result[0][0].price)
       console.log(result[2][0].v_price)
       console.log(result[2][0].v_overall)
  res.render('index_pymt',
  { 
      fullname: fullname,  
      firstname: firstname,
      lastname: lastname,
      id: result[0][0].id,
      property_name: result[0][0].name,
      price: result[0][0].price,
      address: result[0][0].street_details,
      bed: result[0][0].bed,
      bath: result[0][0].bath,
      picture:result[1][0].picture,
      amount: result[2][0].v_price,
      charges: result[2][0].v_charges,
      total: result[2][0].v_overall,
  });
})
}
else {
    res.send('Please login to view this page!');
} 
});


router.post('/paystack-pay/:id', (req, res) => {

  if (req.session.loggedin) {

  email = req.session.email
  var firstname = req.session.firstname
  var lastname =  req.session.lastname 
  var fullname =  firstname.concat(' ',lastname)
  user_id = req.session.userid
  user_id2 = req.session.userid
  console.log(user_id)
  property_id = req.params.id 
  value = [property_id,user_id]

  db.query("CALL initialize_transaction(?,?)",
    value, function (err, result) {   
       if (err) throw err;
       console.log(result[2][0].v_overall)

  var form = {
  email: email,
  metadata : {
      full_name: fullname,
      transaction_id: result[0][0].transaction_id,
      contract_type: result[1][0].purpose,
      property_id: req.params.id,
      user_id: user_id2,
      firstname: firstname,
      lastname: lastname,
      original_amount: result[2][0].v_price,
      charges: result[2][0].v_charges
  },
  amount: result[2][0].v_overall*100, 
};

  initializePayment(form, (error, body)=>{
      response = JSON.parse(body);

      if(response.status === false){
          //if(error){
          //handle errors
          console.log(response);
          return res.redirect('/error-pymt');   
      }
      else{
          console.log(response);
          res.redirect(response.data.authorization_url)
      }
  });
})
}
else {
    res.send('Please login to view this page!');
}
});


router.get('/paystack/callback', (req,res) => {
  if (req.session.loggedin) {

  const ref = req.query.reference;
  var firstname = req.session.firstname
  var lastname =  req.session.lastname 
  var fullname =  firstname.concat(' ',lastname)

  verifyPayment(ref, (error,body)=>{
      if(error){
          //handle errors appropriately
          console.log(error)
          const data = _.at(response.data, 
['metadata.transaction_id', 'status', 'message']);
          db.query("CALL failed_transaction(?,?,?)", data, function (err, result){
            if (err) throw err
          return res.redirect('/error-pymt');
          })
      }
    
      response = JSON.parse(body);
      console.log(response)
      const data = _.at(response.data, ['metadata.transaction_id', 'status', 'gateway_response','metadata.contract_type','metadata.user_id','metadata.firstname','metadata.lastname',
      'metadata.property_id','channel','metadata.original_amount','metadata.charges','amount',
      'log.authentication','authorization.authorization_code','authorization.last4','authorization.exp_month','authorization.exp_year',
      'authorization.bank','authorization.country_code','customer.id','customer.customer_code','reference','paidAt','createdAt','fees']);
     
     db.query("CALL successful_transaction(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data, function (err, result){
          if (err) throw err

    const name = 'Adetutu Ola'
    const invoice = {
    shipping: {
      name: name,
      address: "5 sholanke street Akoka",
      city: "Yaba",
      state: "Lagos",
      country: "NG",
      postal_code: 234800
    },
    items: [
      {
        item: "3 bedroom Rent",
        description: "3 Bedroom Rent Payment",
        purpose: "Rent",
        no_of_month: 12,
        monthly_cost: 125000
      }
    ],
    rp_charges: 5000,
    subtotal: 1500000,
    paid: 1000000,
    invoice_nr: 1234
  };

  //console.log(invoice.items[1]);

 // createInvoice(invoice, "./invoice/invoice.pdf" + Date.now());
 dirName = 'picture'+'_'+name+'_'+ Date.now()
 fs.mkdir(dirName,function(){
 });

 const invoiceUploadPath = path.join(__dirname,'./' + dirName)

 createInvoice(invoice, invoiceUploadPath + "/invoice.pdf" + '_' + Date.now());

  const uploadPicture = () => {
    fs.readdir(invoiceUploadPath, function (err, files) {
      console.log(files.length);
      if (files.length >= 1) {
      if (err) throw err;
      files.forEach(file => { 
        console.log(file); 
        const params = {
          Bucket: 'realprobucket1/repro_invoice', // pass your bucket name
          Key: file, // file will be saved as testBucket/contacts.csv
          Body: JSON.stringify(file, null, 2)
      };

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });
    
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)  
          console.log(`File saved as  ${data.Key}`) 

          value = [data.Location,data.Key] 
          db.query("CALL add_attachment(?,?);", value, function (err, result) {  // add_invoice needs to be properly written for now just a select statement
         if (err) throw err; 
       
  });
      })

   /*   fs.unlink(invoiceUploadPath + '/' + file, function (err) {
        if (err) throw err;
        console.log(file + ' File deleted!');
        
      }); */

      /*
      rimraf(invoiceUploadPath, function (err) { 
        if (err) throw err;
        console.log(' Directory deleted ');
       });
      */

  }) 
}  
});  
} 

          res.redirect('/receipt/'+result[0][0].id);

      })
  });
}
else {
    res.send('Please login to view this page!');
}
});


router.get('/receipt/:id', (req, res)=>{
  if (req.session.loggedin) {
  const id = req.params.id;
  email = req.session.email
  db.query("CALL get_transaction(?)", [id], function (err, result){
      if (err) throw err
      res.render('success-pymt',
      {
        email:email,
        property_amount:result[0][0].property_amount,
        total_charges:result[0][0].total_charges,
        total_amount_paid:result[0][0].total_amount_paid,
        payment_ref_id:result[0][0].payment_ref_id
         });
  })
}
else {
    res.send('Please login to view this page!');
} 
});


router.get('/error-pymt', (req, res)=>{
  res.render('error-pymt');
});


router.get('/index-pymt/:id/:id2/:id3',(req, res) => {


    apartment_id = req.params.id
    user_id = req.params.id2
    ongoing_id = req.params.id3
    value = [apartment_id,user_id,ongoing_id] 
  
    db.query("CALL guest_details(?,?,?)",
    value, function (err, result) {   
       if (err) throw err;    
     
  res.render('index_pymt',
  { 
      fullname: result[0][0].fullname,  
      id: result[1][0].apartment_id,
      id2: result[0][0].user_id,
      id3: result[2][0].ongoing_id,
      amount: result[3][0].overall_total,
  });
})
});


router.get('/upload_shortlet_pictures', (req, res) => {

  
  fs.readFile('logo.PNG' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data
  })

  var form = {
  image: imagepath,
};

upload(imagepath, (error, body)=>{
      var response = JSON.parse(body);

      if(response.success === false){
          //if(error){
          //handle errors
          console.log(response);
          return res.redirect('/error-pymt');   
      }
      else{
          console.log(response);
          res.send(response)
          //res.redirect(response.data.authorization_url)
      }
  });
});


router.post('/paystack-pay/:id/:id2/:id3/:id4', (req, res) => {

  // receive the ongoing_id decrypt it then delete the record from the database.
  apartment_id = req.params.id 
  user_id = req.params.id2
  user_id2 = user_id
  amount = req.params.id3
  ongoing_id = req.params.id4
  value = [apartment_id,user_id,ongoing_id]

  db.query("CALL shortlet_initialize_transaction(?,?,?)",
    value, function (err, result) {   
       if (err) throw err;

  var form = {
  email: result[0][0].email,
  metadata : {
      emailcopy : result[0][0].email, /* added */
      phone_no : result[0][0].phone_no, /* added */
      fullname: result[0][0].fullname,
      transaction_id: result[2][0].transaction_id,
      guest_id: user_id2,
      firstname: result[0][0].firstname,
      lastname: result[0][0].lastname,
      apartment_id: result[1][0].apartment_id,
      ongoing_id: result[3][0].id,    /* added */
      apartment_price: result[3][0].apartment_price,
      stay_length: result[3][0].stay_length,
      total_apartment_price: result[3][0].total_apartment_price,
      cleaning: result[3][0].cleaning,
      pickup: result[3][0].pickup,
      car_rental: result[3][0].car_rental,
      driver: result[3][0].driver,
      security_deposit: result[3][0].security_deposit,
      overall_total: result[3][0].overall_total,
      check_in_date: result[3][0].check_in_date,
      check_out_date: result[3][0].check_out_date
  },
  amount: amount * 100, 
};

  initializePayment(form, (error, body)=>{
      var response = JSON.parse(body);

      if(response.status === false){
          //if(error){
          //handle errors
          console.log(response);
          return res.redirect('/error-pymt');   
      }
      else{
          console.log(response);
          
          res.redirect(response.data.authorization_url)
      }
  });
})
});


router.get('/paystack/callback/shortlet', (req,res) => {
  

  const ref = req.query.reference;

  verifyPayment(ref, (error,body)=>{
      if(error){
          //handle errors appropriately
          console.log(error)
          
          const data = _.at(response.data, ['metadata.emailcopy','metadata.transaction_id', 'metadata.ongoing_id','metadata.guest_id', 
          'metadata.fullname','metadata.phone_no','status', 'message','metadata.check_in_date','metadata.check_out_date',
          'metadata.overall_total','reference']);
          db.query("CALL failed_transaction(?,?,?,?,?,?,?,?,?,?,?,?)", data, function (err, result){
            if (err) throw err
          return res.redirect('/error-pymt');
          })
      }
    

      var response = JSON.parse(body);
      // console.log(response)
      // console.log(response.data.metadata)
      // console.log(response.data.customer)
      // console.log(response.data.customer.email)
      email = response.data.customer.email
      email2 = encrypt2(email)
      console.log(email2)
      console.log(decrypt2(email2))
      console.log(email)
      //console.log(decrypt(email3))
      firstname = response.data.metadata.firstname
      fullname = response.data.metadata.fullname
      reference = response.data.reference
      amount = response.data.metadata.overall_total
      security_deposit = response.data.metadata.security_deposit
      check_in_date = response.data.metadata.check_in_date
      check_out_date = response.data.metadata.check_out_date
    /* addede parameters - 'metadata.emailcopy', 'metadata.ongoing_id', 'metadata.guest_id', 'metadata.phone_no', 'metadata.fullname' */
      const data = _.at(response.data, ['metadata.emailcopy','metadata.transaction_id','metadata.ongoing_id','metadata.guest_id', 
      'metadata.phone_no', 'status', 'gateway_response','metadata.guest_id',
      'metadata.firstname','metadata.lastname','metadata.fullname','metadata.apartment_id','channel',

      'log.authentication','authorization.authorization_code','authorization.last4','authorization.exp_month','authorization.exp_year',
      'authorization.bank','authorization.country_code','customer.id','customer.customer_code','reference','paidAt','createdAt','fees',

      'metadata.apartment_price','metadata.stay_length','metadata.total_apartment_price','metadata.cleaning','metadata.pickup',
      'metadata.car_rental','metadata.driver','metadata.security_deposit','metadata.overall_total','metadata.check_in_date','metadata.check_out_date']);
     
     db.query("CALL shortlet_successful_transaction(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data, function (err, result){
          if (err) throw err
        
          payment_id = result[0][0].payment_id
          apartment_price = result[0][0].v_apartment_priceb
     stay_length = result[0][0].v_stay_lengthb
     total_apartment_price = result[0][0].v_total_apartment_priceb
     cleaning = result[0][0].v_cleaningb
     pickup = result[0][0].v_pickupb
     car_rental = result[0][0].v_car_rentalb
     driver = result[0][0].v_driverb

     
     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
     const msg = {
       to: email, // Change to your recipient
       from: process.env.FROM_EMAIL2, // Change to your verified sender
       templateId: 'd-4c8ce90b580f4ddf807abedf79499728',
       dynamic_template_data: {
        apartment_price: apartment_price, stay_length: stay_length, total_apartment_price: total_apartment_price,
        cleaning: cleaning, pickup: pickup, car_rental: car_rental, driver: driver,firstname: firstname, fullname: fullname, 
        email: email, sd:security_deposit, amt: amount, payment_id: payment_id, check_in_date: check_in_date, check_out_date: check_out_date
       }
     }
     sgMail
       .send(msg)
       .then(() => {
         console.log('Email sent')
       })
       .catch((error) => {
         console.error(error)
       })


  /*        
          // Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
}
  });

  var payment_id = result[0][0].payment_id

  
  // Step 2
  transporter.use('compile', hbs({
  viewEngine:{layoutsDir: __dirname + "/views/layouts",
  extname: ".handlebars"},
  viewPath: './views/'
  
  }));
  
  //var maillist = 'adetutu.olalekan@gmail.com, adetutu.olalekan@yahoo.com, adetutu.olalekan@gmail.com';

  // Step 3
  let mailOptions = {
  from: process.env.FROM_EMAIL, //process.env.FROM_EMAIL, // TODO: email sender
  to: email, // TODO: email receiver
  subject: 'Payment Details',
  text: 'IT works 3!!',
  template:'payment_confirmation',
  context: {
    
      firstname: firstname, fullname: fullname, email: email, reference: reference,
      security_deposit:security_deposit, amount: amount, payment_id: payment_id, 
      check_in_date: check_in_date, check_out_date: check_out_date
    
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

  */

          res.send('PaymentSuccessful');

      })
  });
});


router.post('/manual-pay/:id1/:id2/:id3', (req, res) => {  // manual payment API

  // receive the ongoing_id decrypt it then delete the record from the database.
  apartment_id = req.params.id1 
  user_id = req.params.id2
  user_id2 = user_id
  //amount = req.params.id3
  ongoing_id = req.params.id3
  value = [apartment_id,user_id,ongoing_id]

  db.query("CALL shortlet_initialize_transaction_manually(?,?,?)",
    value, function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Manual Transaction',
        transaction_info: result[0],
        payment_details: result[1],
        pending_id: result[2],
        time: result[3],
        alert: result[4][0].temp_max_id
       })



       guest_name = result[5][0].guest_name
       email = result[5][0].email
       phone_no = result[5][0].phone_no
       check_in = result[5][0].check_in
       check_out = result[5][0].check_out
       amount = result[5][0].amount
       pymt_reference = result[5][0].pymt_reference
       status = result[5][0].status
       a.shortname = result[5][0].shortname

})
});



router.post('/set-customer-pymt-confirmation/:id1', (req, res) => {  // manual payment API

  // receive the ongoing_id decrypt it then delete the record from the database.
  max_id = req.params.id1 
  cust_confirmation = req.body.cust_confirmation
  value = [max_id,cust_confirmation]

  db.query("CALL set_customer_payment_confirmation(?,?)",
    value, function (err, result) {   
       if (err) throw err;
})
});




router.post('/book-manual/:id1', (req, res) => {  // manual payment API
 // if (req.userData) { 
  
  pending_id = req.params.id1 
  bank_transaction_id = req.body.bank_transaction_id
 // bdt_user = req.userData.firstname
  bdt_user = req.body.bdt_user
  //payment_time = req.params.id2
  payment_time = req.body.payment_time
  
  value = [pending_id,bank_transaction_id,bdt_user,payment_time]

  console.log(value)

  db.query("CALL shortlet_successful_transaction_manual(?,?,?,?)",
    value, function (err, result) {   
       if (err) throw err;
       
       firstname = result[0][0].v_firstname
       fullname = result[0][0].v_guest_name
       email = result[0][0].email
       payment_id = result[0][0].payment_id
       amount = result[0][0].amount
       security_deposit = result[0][0].security_deposit
       check_in_date = result[0][0].v_check_in_date
       check_out_date = result[0][0].v_check_out_date

       apartment_price = result[0][0].v_apartment_priceb
     stay_length = result[0][0].v_stay_lengthb
     total_apartment_price = result[0][0].v_total_apartment_priceb
     cleaning = result[0][0].v_cleaningb
     pickup = result[0][0].v_pickupb
     car_rental = result[0][0].v_car_rentalb
     driver = result[0][0].v_driverb

     console.log(firstname)
console.log(fullname)
console.log(email)
console.log(payment_id)
console.log(amount)
console.log(security_deposit)
console.log(check_in_date)
console.log(check_out_date)
console.log(apartment_price)
console.log(stay_length)
console.log(total_apartment_price)
console.log(cleaning)
console.log(pickup)
console.log(car_rental)
console.log(driver)

     
     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
     const msg = {
       to: email, // Change to your recipient
       from: process.env.FROM_EMAIL2, // Change to your verified sender
       templateId: 'd-9d5762fe25ec437e86d2058f0daf4efa',
       dynamic_template_data: {
        apartment_price: apartment_price, stay_length: stay_length, total_apartment_price: total_apartment_price,
        cleaning: cleaning, pickup: pickup, car_rental: car_rental, driver: driver,firstname: firstname, fullname: fullname, 
        email: email, sd:security_deposit, amt: amount, payment_id: payment_id, check_in_date: check_in_date, check_out_date: check_out_date
       }
     }
     sgMail
       .send(msg)
       .then(() => {
         console.log('Email sent')
       })
       .catch((error) => {
         console.error(error)
       })


 /*     // Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
}
  });


  
  // Step 2
  transporter.use('compile', hbs({
  viewEngine:{layoutsDir: __dirname + "/views/layouts",
  extname: ".handlebars"},
  viewPath: './views/'
  
  }));
  
  //var maillist = 'adetutu.olalekan@gmail.com, adetutu.olalekan@yahoo.com, adetutu.olalekan@gmail.com';

  // Step 3
  let mailOptions = {
  from: process.env.FROM_EMAIL, //process.env.FROM_EMAIL, // TODO: email sender
  to: email, // TODO: email receiver
  subject: 'Payment Details',
  text: 'IT works 3!!',
  template:'payment_confirmation',
  context: {
    
      firstname: firstname, fullname: fullname, email: email, 
      security_deposit:security_deposit, amount: amount, payment_id: payment_id, 
      check_in_date: check_in_date, check_out_date: check_out_date
    
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

  */


       res.send({
        title: 'Booking Successful'
       })
})
//} 
// else {
 // res.send('Please login to view this page!');
// }
});


router.post('/update_booking_external',validateLoginMiddleware.isLoggedIn, (req,res) => {
  if (req.userData) { 

  apartment_id = req.params.id1
  
  firstname = req.body.firstname
  lastname = req.body.lastname
  email = req.body.email
  phone_no = req.body.phone_no 
  check_in_date = req.bpdy.check_in_date
  check_out_date = req.bodycheck_out_date
  amount = rq.body.amount
  reference_no = req.body.reference_no
  bank_trasaction_id = req.body.bank_transaction_id
  external_platform = req.body.platform
  bdt_user = req.userData.firstname
  title = req.body.title
  agent_name = req.body.agent_name
  agent_phone_no = req.body.agent_phone_no

  value = [firstname,lastname,email,phone_no,apartment_id,check_in_date,check_out_date,amount,reference_no,bank_transaction_id,external_platform,bdt_user,title,agent_name,agent_phone_no] 
  db.query("CALL update_shortlet_booking(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log()
     firstname = result[0][0].v_firstname
     fullname = result[0][0].v_guest_name
     email = result[0][0].email
     payment_id = result[0][0].payment_id
     amount = result[0][0].amount
     security_deposit = result[0][0].security_deposit
     check_in_date = result[0][0].check_in
     check_out_date = result[0][0].check_out
     apartment_price = result[0][0].v_apartment_priceb
     stay_length = result[0][0].v_stay_lengthb
     total_apartment_price = result[0][0].v_total_apartment_priceb
     cleaning = result[0][0].v_cleaningb
     pickup = result[0][0].v_pickupb
     car_rental = result[0][0].v_car_rentalb
     driver = result[0][0].v_driverb


     console.log(firstname)
console.log(fullname)
console.log(email)
console.log(payment_id)
console.log(amount)
console.log(security_deposit)
console.log(check_in_date)
console.log(check_out_date)
console.log(apartment_price)
console.log(stay_length)
console.log(total_apartment_price)
console.log(cleaning)
console.log(pickup)
console.log(car_rental)
console.log(driver)

     
     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
     const msg = {
       to: email, // Change to your recipient
       from: process.env.FROM_EMAIL2, // Change to your verified sender
       templateId: 'd-4c8ce90b580f4ddf807abedf79499728',
       dynamic_template_data: {
        apartment_price: apartment_price, stay_length: stay_length, total_apartment_price: total_apartment_price,
        cleaning: cleaning, pickup: pickup, car_rental: car_rental, driver: driver,firstname: firstname, fullname: fullname, 
        email: email, sd:security_deposit, amt: amount, payment_id: payment_id, check_in_date: check_in_date, check_out_date: check_out_date
       }
     }
     sgMail
       .send(msg)
       .then(() => {
         console.log('Email sent')
       })
       .catch((error) => {
         console.error(error)
       })

     /*
     // Step 1
const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
secure: true,
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD
},
tls: {
  rejectUnauthorized: false
}
});



// Step 2
transporter.use('compile', hbs({
viewEngine:{layoutsDir: __dirname + "/views/layouts",
extname: ".handlebars"},
viewPath: './views/'

}));

//var maillist = 'adetutu.olalekan@gmail.com, adetutu.olalekan@yahoo.com, adetutu.olalekan@gmail.com';

// Step 3
let mailOptions = {
from: process.env.FROM_EMAIL, //process.env.FROM_EMAIL, // TODO: email sender
to: email, // TODO: email receiver
subject: 'Payment Details',
text: 'IT works 3!!',
template:'payment_confirmation',
context: {
  
    firstname: firstname, fullname: fullname, email: email, 
    security_deposit:security_deposit, amount: amount, payment_id: payment_id, 
    check_in_date: check_in_date, check_out_date: check_out_date
  
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

*/
     res.send({
      title: 'Booking Successful'
    })
   })
  } 
  else {
    res.send('Please login to view this page!');
  }
 })


 router.post('/update_booking_external2',validateLoginMiddleware.isLoggedIn, (req,res) => { // In Use
  if (req.userData) { 

  apartment_id = req.params.id1
  
  firstname = req.body.firstname
  lastname = req.body.lastname
  email = req.body.email
  phone_no = req.body.phone_no 
  check_in_date = req.body.check_in_date
  check_out_date = req.bodycheck_out_date
  amount = rq.body.amount
  reference_no = req.body.reference_no
  bank_trasaction_id = req.body.bank_transaction_id
  external_platform = req.body.platform
  bdt_user = req.userData.firstname
  title = req.body.title
  agent_name = req.body.agent_name
  agent_phone_no = req.body.agent_phone_no

  value = [firstname,lastname,email,phone_no,apartment_id,check_in_date,check_out_date,amount,reference_no,bank_transaction_id,external_platform,bdt_user,title,agent_name,agent_phone_no] 
  db.query("CALL update_shortlet_booking2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 

       guest_name = result[5][0].guest_name
       email = result[5][0].email
       phone_no = result[5][0].phone_no
       check_in = result[5][0].check_in
       check_out = result[5][0].check_out
       amount = result[5][0].amount
       pymt_reference = result[5][0].pymt_reference
       status = result[5][0].status
       ashortname = result[5][0].shortname


       sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const body = 'We have a new pending booking. Please note the booking will expire in the next 30mins from the time you received this email.\n\n Ensure u do a follow up.'
            const msg = {
                to: bdmEmail, // Change to your recipient
                from: process.env.FROM_EMAIL2, // Change to your verified sender
                // templateId: 'd-4c8ce90b580f4ddf807abedf79499728',
                subject: 'Pending Booking',
                text: body,
                html: 
                    `<p>Hello RP Shortlets</p>
                    <br/>
                    <p>${body}</p>
                    <br/>
                    <br/>
                    <p>Guest Name: ${guest_name}</p>
                    <p>Apartment: ${ashortname}</p>
                    <p>CheckIn: ${check_in}</p>
                    <p>CheckOut: ${check_out}</p>
                    <p>Amount ${amount}</p>
                    <p>Email: ${email}</p>
                `  
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
      title: 'Booking Successfully Held',
      transaction_info: result[0],
        payment_details: result[1],
        pending_id: result[2],
        time: result[3],
        alert: result[4][0].temp_max_id
    })
   })
  } 
  else {
    res.send('Please login to view this page!');
  }
 })



router.post('/cancel-manual-payment/:id', (req, res) => {    // Cancellation of Payment initiated by Customer (Manual Booking)

  // receive the ongoing_id decrypt it then delete the record from the database.
  pending_id = req.params.id 
  
  value = [pending_id]

  db.query("CALL delete_pending_transaction(?)",
    value, function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Payment Successfully Cancelled'
       })
})
});


router.post('/expired-manual-payment/:id', (req, res) => {    // Cancellation of Payment initiated by Customer (Manual Booking)

  // receive the ongoing_id decrypt it then delete the record from the database.
  pending_id = req.params.id 
  
  value = [pending_id]

  db.query("CALL delete_pending_transaction2(?)",
    value, function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Payment Successfully Cancelled'
       })
})
});


router.post('/expired-manual-payment-automatically', (req, res) => {    // Cancellation of Payment initiated by expiry of grace time

  // receive the ongoing_id decrypt it then delete the record from the database.

  db.query("CALL delete_pending_transaction_automatic()", function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Expired payments deleted'
       })
})
});

router.post('/expired-manual-payment2', (req, res) => {    // Cancellation of Payment initiated by expiry of grace time

  // receive the ongoing_id decrypt it then delete the record from the database.

  db.query("CALL expired_transaction()",
    value, function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Payment timeline expired'
       })
})
});


router.get('/get-deleted-payments', (req, res) => {    


  db.query("CALL get_deleted_transactions()",function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Deleted Payments',
        results: result[0]
       })
})
});


router.get('/get-completed-payments', (req, res) => {    


  db.query("CALL get_completed_transactions()", function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Completed Payments',
        results: result[0]
       })
})
});


router.get('/get-pending-payments', (req, res) => {    


  db.query("CALL get_pending_transactions()", function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Pending Payments',
        results: result[0]
       })
})
});


router.post('/enquiry',(req,res) => {
  
    
    firstname = req.body.firstname
    lastname = req.body.lastname
    email = req.body.email
    subject = req.body.subject
    message = req.body.message

    value = [firstname, lastname, email, subject, message]
    
    bdm_email = 'adetutu.olalekan@gmail.com'

    db.query("CALL new_enquiry(?,?,?,?,?);",value, function (err, result){
      if (err) throw err;


// Step 1
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
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
  from: process.env.FROM_EMAIL, // TODO: email sender
  to: bdm_email, // TODO: email receiver
  subject: 'New Enquiry',
  text: 'IT works 3!!',
  template:'enquiry_bdm',
  context: {
    firstname: firstname,
    lastname: lastname,
      email: email,
      subject:subject,
      message: message
  } // send extra values to template
  } 

  // Step 3
  let mailOptions2 = {
    from: process.env.FROM_EMAIL, // TODO: email sender
    to: email, // TODO: email receiver
    subject: "Enquiry Request Confirmation",
    text: 'IT works 3!!',
    template:'enquiry_customer',
    context: {
      firstname: firstname,
    } // send extra values to template
    } 
  
  console.log(mailOptions)
  console.log(mailOptions2)
  
  // Step 4
  transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return console.log('Error occurs',err);
  }
  return console.log('Email sent to BDM!!!', data);
  });

   // Step 4
   transporter.sendMail(mailOptions2, (err, data) => {
    if (err) {
        return console.log('Error occurs',err);
    }
    return console.log('Email sent!!!', data);
    });
  })
     
     res.send('Emails sent out')
 }) 


router.get('/get-enquiry', (req, res) => {    


  db.query("CALL get_all_enquiry()", function (err, result) {   
       if (err) throw err;

       res.send({
        title: 'Completed Payments',
        results: result[0]
       })
})
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
            firstname: result[1][0].firstname
          },
          process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
          }
        );

        res.send({
          email: email,
          token,
          firstname: result[1][0].firstname,
          employee_Id: result[1][0].id
        });
          
      }  else if (result[0][0].v_result === 0) {
        res.send('Email or Password is wrong')  
      }
  });

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


router.get('/apartment_info', validateLoginMiddleware.isLoggedIn, (req, res) => {    
  if (req.userData) { 
     apartment_id = req.body.apartment_id

    db.query("CALL apartment_info(?)", [apartment_id], function (err, result) {   
         if (err) throw err;
  
         res.send({
          title: 'Deleted Payments',
          price: result[0],
          booked_dates: result[1],
          temp_booked_dates: result[2]
         })
  })
} 
else {
  res.send('Please login to view this page!');
}
  });   



module.exports = router;