require('dotenv').config();
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'adetutu.olalekan@yahoo.com', // Change to your recipient
  from: 'admin@realproperties.ng', // Change to your verified sender
  templateId: 'd-1bf4cc7f3ee2473a82c4124ded0ad21e',
  dynamic_template_data: {
    subject: 'Testing Templates',
    name: 'Some One',
    city: 'Denver',
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