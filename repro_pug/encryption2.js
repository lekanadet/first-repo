// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = "aes-256-cbc"; 
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);


// the cipher function
function encrypt2(text) {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
 }


// the decipher function
function decrypt2(text) {

  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(text, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
 }

 const message = "This is a secret message";
 const message2 = '5';
 const encryptedMessage = encrypt2(message)
 const decryptedMessage = decrypt2(encryptedMessage)

 const encryptedMessage2 = encrypt2(message2)
 const decryptedMessage2 = decrypt2(encryptedMessage2)

 console.log(encryptedMessage)
 console.log(decryptedMessage)
console.log()
 console.log(encryptedMessage2)
 console.log(decryptedMessage2)

 module.exports = {
  encrypt2,decrypt2
};



 


