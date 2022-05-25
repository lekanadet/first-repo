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
const sgMail = require('@sendgrid/mail')



router.get('/update-booking',(req,res) => {
  
  db.query("CALL update_booking2()", function (err, result) {   
     if (err) throw err; 
     
     res.send('Booking updated')
   })
 }) 



 
router.get('/get-upcoming-apartment',(req,res) => {

  db.query("CALL get_upcoming_pictures()", function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     console.log(result[0])
  
     res.send({
     title1: 'Upcoming Property Pictures',
     result: result[0]
    })
   })
 }) 


 router.get('/upcoming-shortlet-details/:id',(req,res) => {
  
  apartment_id = req.params.id
  
  value = [apartment_id] 
  db.query("CALL get_upcoming_shortlet_details(?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     console.log(result[1])
     console.log(result[2])
     console.log(result[3])
     
     res.send({
     title1: 'Property Details',
     general_info: result[0],
     pictures: result[1],
     pictures_count: result[2],
     amenities: result[3]
    })
   })
 }) 



 router.post('/save-upcoming-customer-info/:id',(req,res) => {

  apartment_id = req.params.id
  
  firstname = req.body.firstname
  lastname = req.body.lastname
  email = req.body.email
  phone_no = req.body.phone_no 


  value = [apartment_id,firstname,lastname,email,phone_no] 
  db.query("CALL upcoming_customer_info(?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 

    promo_code = result[0][0].promo_code

     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const body = `We are excited you showed interest in our upcoming brandnew apartments. Please use the code below to get 20% off when the apartment is ready`
            const body2 = ` The Apartment will be ready for booking from 20th of May, 2022 `
            const msg = {
                to: email, // Change to your recipient
                from: process.env.FROM_EMAIL2, // Change to your verified sender
                // templateId: 'd-4c8ce90b580f4ddf807abedf79499728',
                subject: 'Promo Code',
                text: body,
                html: 
                    `<p>Hello ${firstname}, </p>
                    <br/>
                    <p>${body}</p>
                    <p>${body2}</p>
                    <br/>
                    <p>Promo Code: ${promo_code}</p>
                    
                    <p>Please note that the code can only be used once and it is valid until 20th of June, 2022.</p>
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
     title: 'Customer Info saved ',
     Promocode: result[0]
    })
   })
 })



router.get('/shortlet-details/:id/:id2/:id3',(req,res) => {
  
  property_id = req.params.id
  check_in = req.params.id2 === ':id2' ? null:req.params.id2
  check_out = req.params.id3 === ':id3' ? null:req.params.id3
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [property_id,check_in,check_out] 
  db.query("CALL get_shortlet_details(?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     console.log(result[1])
     console.log(result[2])
     console.log(result[3])
     console.log(result[4])
     console.log(result[5])
     console.log(result[6])
     
     res.send({
     title1: 'Property Details',
     general_info: result[0],
     pictures: result[1],
     pictures_count: result[2],
     amenities: result[3],
     dates: result[4],
     booked_dates: result[5],
     summary_details: result[6]
    })
   })
 }) 



 router.get('/payment-summary/:id/:id2/:id3',(req,res) => {
  
  property_id = req.params.id
  check_in = req.params.id2 === ':id2' ? null:req.params.id2
  check_out = req.params.id3 === ':id3' ? null:req.params.id3
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [property_id,check_in,check_out] 
  db.query("CALL payment_summary_details(?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     console.log(result[1])
     console.log(result[2])
     console.log(result[3])
     
     res.send({
     title1: 'Payment Summary Details',
     price: result[0],
     max_guest: result[1],
     dates: result[2],
     booked_dates: result[3],
     summary_details: result[4]
    })
   })
 }) 


 router.get('/payment-summary-update/:id/:id2/:id3',(req,res) => {
  
  property_id = req.params.id
  check_in = req.params.id2 === ':id2' ? null:req.params.id2
  check_out = req.params.id3 === ':id3' ? null:req.params.id3
  cleaning = req.query.cleaning,
  pickup = req.query.pickup,
  car_rental = req.query.car_rental,
  car_rental_length = req.query.car_rental_length,
  driver = req.query.driver
  driver_length = req.query.driver_length
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [property_id,check_in,check_out,cleaning,pickup,car_rental,car_rental_length,driver,driver_length] 
  db.query("CALL update_payment_summary_details(?,?,?,?,?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     console.log(result[1])
     console.log(result[2])
     console.log(result[3])
     
     res.send({
      title1: 'Payment Summary Details',
      price: result[0],
      max_guest: result[1],
      dates: result[2],
      booked_dates: result[3],
      summary_details: result[4]
    })
   })
 }) 


 router.post('/update_calender',(req,res) => {
  
  check_in = req.body.check_in 
  check_out = req.body.check_out 
  value = [check_in,check_out] 
  db.query("CALL update_calender(?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     console.log(result[0])
     
     res.send({
     title1: 'Property Details',
     dates: result[0]
    })
   })
 }) 



 router.post('/ongoing_transaction/:id1/:id2/:id3/:id4/:id5/:id6/:id7/:id8/:id9/:id10/:id11/:id12',(req,res) => {
  
  apartment_id = req.params.id1 === ':id1' ? null:req.params.id1
  apartment_price = req.params.id2 === ':id2' ? null:req.params.id2
  stay_length = req.params.id3 === ':id3' ? null:req.params.id3
  total_apartment_price = req.params.id4 === ':id4' ? null:req.params.id4
  cleaning = req.params.id5 === ':id5' ? null:req.params.id5
  pickup = req.params.id6 === ':id6' ? null:req.params.id6
  car_rental = req.params.id7 === ':id7' ? null:req.params.id7
  driver = req.params.id8 === ':id8' ? null:req.params.id8
  security_deposit = req.params.id9 === ':id9' ? null:req.params.id9
  overall_total = req.params.id10 === ':id10' ? null:req.params.id10
  check_in_date = req.params.id11 === ':id10' ? null:req.params.id11
  check_out_date = req.params.id12 === ':id10' ? null:req.params.id12
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [apartment_id,apartment_price,stay_length,total_apartment_price,cleaning,pickup,car_rental,driver,security_deposit,overall_total] 
  db.query("CALL ongoing_transaction(?,?,?,?,?,?,?,?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     
     res.send({
     title1: 'Ongoing Transaction',
     Ongoing_id: result[0],
     apartment_id: result[1]
    })
   })
 }) 



 router.post('/retreive_ongoing_transaction/:id',(req,res) => {
  
  ongoing_id = req.params.id
  
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [ongoing_id] 
  db.query("CALL retreive_ongoing_transaction(?)",
  value, function (err, result) {   
     if (err) throw err; 
     
     res.send({
     title1: 'Ongoing Transaction',
     Ongoing_id_info: result[0],
     Guest_id: result[1],
     apartment_name: result[2]
    })
   })
 }) 



 router.get('/retreive_payment_details/:id',(req,res) => {
  
  ongoing_id = req.params.id
  
  //check_in = req.params.id2
  //check_out = req.params.id3
  value = [ongoing_id] 
  db.query("CALL retreive_payment_details(?)",
  value, function (err, result) {   
     if (err) throw err; 
     
     res.send({
     title1: 'Payment Details',
     info1: result[0],
     info2: result[1]
    })
   })
 }) 




 router.post('/save_customer_info',(req,res) => {

  apartment_id = req.params.id1
  ongoing_id = req.params.id2
  
  firstname = req.body.firstname
  lastname = req.body.lastname
  email = req.body.email
  phone_no = req.body.phone_no 
  dob = req.body.dob
  nationality = req.body.nationality 
  mode_of_identification = req.body.mode_of_identification 
  identification_no = req.body.identification_no
  title = req.body.title
  agent_name = req.body.agent_name
  agent_phone_no = req.body.agent_phone_no

  value = [ongoing_id,firstname,lastname,email,phone_no,dob,nationality,mode_of_identification,identification_no,title,agent_name,agent_phone_no] 
  db.query("CALL update_customer_info(?,?,?,?,?,?,?,?,?,?,?,?)",
  value, function (err, result) {   
     if (err) throw err; 
     
     res.send({
     title: 'Save Customer Information',
     guest_id: result[0],
     apartment_id: apartment_id,
     ongoing_id: ongoing_id
    })
   })
 })



router.get('/view-property/:id',(req,res) => {
  
    property_id = req.params.id
    value = [property_id] 
    db.query("CALL get_property_details(?)",
    value, function (err, result) {   
       if (err) throw err; 
       console.log(result[0])
       console.log(result[1])
       console.log(result[2])
       console.log(result[3])
       console.log(result[4])
       console.log(result[5])
       console.log(result[6])
       
       res.render('property_details',
        { 
       title1: 'Property Details',
       data1: result[0],
       id: result[0][0].id,
       data2: result[1],
       data3: result[2],
       data4: result[3],
       data5: result[4],
       data6: result[5],
       data7: result[6]
      })
     })
   }) 


   router.post('/book-tour',(req,res) => {
   
    firstname = req.body.firstname
    lastname = req.body.lastname
    email = req.body.email
    phone_no = req.body.phone_no
    date = req.body.date
    tour_person = req.body.tour_person === undefined ? null:req.body.tour_person
    tour_video = req.body.tour_video === undefined ? null:req.body.tour_video
    
    value = [firstname,lastname,email,phone_no,date,tour_person,tour_video] 

    db.query("CALL register_tour(?,?,?,?,?,?,?)",
    value, function (err, result) {   
       if (err) throw err; 
       
       res.send('Tour successfully registered')

     })
   }) 


   



   module.exports = router;