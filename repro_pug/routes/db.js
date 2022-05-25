
var mysql = require('mysql')

var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "Kolapoishola123$",
    database: "Real_properties",
    multipleStatements: true
  });   

  con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;