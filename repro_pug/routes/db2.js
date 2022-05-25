
var mysql = require('mysql')

var con = mysql.createConnection({  
    host: "mysql-rds-db.c2qwgkg6f8xf.us-east-2.rds.amazonaws.com",  
    user: "admin",  
    password: "Kolapoishola123$",
    database: "real_properties",
    multipleStatements: true
  });   

  con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;



