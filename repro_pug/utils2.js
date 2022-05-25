const time = require('unix-timestamp');
time.now()
//console.log(time.timestamp.now)
var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds

var datetime = Math.floor(new Date()) // in seconds

console.log(currentTimeInSeconds)
console.log(datetime)

let ts = Date.now();
console.log(ts)
let date_ob = new Date(ts);
let hour = date_ob.getHours();
let minute = date_ob.getMinutes();
let second = date_ob.getSeconds();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
console.log(year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second)
var dateValue = (year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second)
var dateString = new Date(dateValue)
var timeStamp = dateString.getTime();
console.log(timeStamp)

var d = "2021-01-6"
var t = new Date(d).getTime()
console.log(t)