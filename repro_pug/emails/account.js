const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey)
const rand = require('../utility/randomUtils.js')
//const { randUrl } = require('../Utility/randomUtils.js');
var faker = require('faker')


const sendWelcomeEmail = (email,name) => {

var url = rand.randUrl()

sgMail.send({
    to: email, // Change to your recipient
  from: 'ladetutu@technotrendng.com', // Change to your verified sender
  subject: 'Joining Real Properties',
  name: name,
  text: `${name}, we welcome you to Real properties Community`
  //templateId: 'ba81db7c-75fe-450f-a8f1-696366187ffe',
})
}

module.exports = {
    sendWelcomeEmail
}







// First Repro API - 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
// Repro App - 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