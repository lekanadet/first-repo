var express = require('express');
var router = express.Router();

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;



const sendEmail = (email,name) => {
  MailConfig.ViewOption(gmailTransport,hbs);
  let HelperOptions = {
    from: 'adetutu.olalekan@gmail.com',
    to: 'adetutu.olalekan@yahoo.com',
    subject: 'Hellow world!',
    template: 'welcome',
    context: {
      name: name,
      email: email,
    }
  };

  gmailTransport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
    }
    console.log("email is send");
    console.log(info);
  });
}


module.exports = {
    sendEmail:sendEmail
}

