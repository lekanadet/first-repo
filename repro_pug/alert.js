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
var session = require("express-session");

/* Property Alert Route */
router.get('/property-alert-form2', function(req, res, next) {
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
//})


// Step 4
//var task = cron.schedule('*/30 * * * * *', () =>  {
var date = new Date(year, js_month, day, 14, 26, 0);
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
res.send('Notification sent')
})
});

module.exports = router;