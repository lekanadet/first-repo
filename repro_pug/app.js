const path = require('path')
const express = require('express')
var cors = require('cors')
var app = express()
var db = require('./database/db2.js');
const hbs = require('hbs')
const pug = require('pug');
const bodyparser = require('body-parser')
const cookieParser = require("cookie-parser");
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);



app.use(cors())

app.use(cookieParser());

app.use(bodyparser.urlencoded({
    extended: false

 })); 

app.use(bodyparser.json())


 app.use(session({
    key: "userId",
    secret: 'asdf;lkjh3lkjh235l23h5l235kjh',
    resave: true,
    saveUninitialized: false,
    cookie: {
      
    },
    store: new MySQLStore({  
      host: "mysql-rds-db1.cl669lhbwjdc.us-east-2.rds.amazonaws.com", 
      user: "admin",  
      password: "Kolapoishola123$",
      database: "real_properties",
      multipleStatements: true
    }),
  })); 

var loginRouter = require('./login') 
var userRouter = require('./user')
var userRouter2 = require('./user2')
var userRouter3 = require('./user3')
var agentRouter = require('./agent')
var alertRouter = require('./alert')
var testRouter = require('./test')
var searchFilterRouter = require('./searchFilter')
var searchAreaRouter = require('./searchArea')
var tenantHomeRouter = require('./tenant_home')
var landlordHomeRouter = require('./landlord_home')
var favoritesRouter = require('./favorites')
var saveSearchRouter = require('./saveSearch')
var myLandlordRouter = require('./mylandlord')
var maintainanceRouter = require('./maintainance')
var messageRouter = require('./message')
var tenantAlertRouter = require('./tenant_alert')
var listingRouter = require('./listing')
var uploadRouter = require('./upload')
var landlordMaintainanceRouter = require('./landlord_maintainance')
var referralsRouter = require('./referrals')
var accountProfileRouter = require('./account_profile')
var landlordPaymentsRouter = require('./landlord_payments')
var tenantPaymentsRouter = require('./tenant_payments')
var upload2Router = require('./upload2')
var paymentRouter = require('./payment')
var paymentsChartsRouter = require('./payments_charts')
var logOutRouter = require('./log_out')
var viewRouter = require('./viewer')
var propertyRouter = require('./property')
var bookingRouter = require('./online_booking')
var testcopyRouter = require('./testcopy')
var encryptRouter = require('./encryption')
var emailSenderRouter = require('./email_sender')
//var upload3Router = require('./upload3')
//var upload6Router = require('./upload6')


// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'./public')
const viewsPath = path.join(__dirname,'./views')

//app.use(express.static(path.join(__dirname, 'public/')));


// set up handlebars engine and views location
app.set('view engine', 'hbs')
//app.set('view engine', pug);
app.set('views',viewsPath)

//hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.use('/', saveSearchRouter);
app.use('/', loginRouter);
app.use('/', userRouter);
app.use('/', userRouter2);
app.use('/', userRouter3);
app.use('/', agentRouter);
app.use('/', alertRouter);
app.use('/', testRouter);
app.use('/', searchFilterRouter);
app.use('/', searchAreaRouter);
app.use('/', tenantHomeRouter);
app.use('/', landlordHomeRouter);
app.use('/', favoritesRouter);
app.use('/',  myLandlordRouter);
app.use('/',  maintainanceRouter);
app.use('/',  messageRouter);
app.use('/',  tenantAlertRouter);
app.use('/',  listingRouter);
app.use('/',  uploadRouter);
app.use('/',  upload2Router);
app.use('/',  landlordMaintainanceRouter);
app.use('/',  referralsRouter);
app.use('/',  accountProfileRouter);
app.use('/',  landlordPaymentsRouter);
app.use('/',  tenantPaymentsRouter);
app.use('/',  paymentRouter);
app.use('/',  paymentsChartsRouter);
app.use('/',  logOutRouter);
app.use('/',  viewRouter);
app.use('/',  propertyRouter);
app.use('/',  bookingRouter);
app.use('/',  testcopyRouter);

//app.use('/',  encryptRouter);
//app.use('/',  emailSenderRouter);




// TO DO
// 1. Add attachment to comments in Landlord Maintainance
// 2. Add mail sending capability to landlord referral
// 3. Add attachement to messaging for both tenant and landlord



app.listen(2000,() => {
    console.log("server is up on port 2000")
})