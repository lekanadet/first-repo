// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS_SDK_LOAD_CONFIG=1 
AWS.config.update({region: 'eu-west-2'});

// Create sendEmail params 
var params = {
  Destination: { 
    CcAddresses: [
      'adetutu.olalekan@yahoo.com',
      /* more items */
    ],
    ToAddresses: [
      'adediwuraonifade5@gmail.com'
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
     }
    },
  Source: 'adetutu.olalekan@gmail.com', /* required */
  ReplyToAddresses: [
     'adetutu.olalekan@gmail.com',
    /* more items */
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });