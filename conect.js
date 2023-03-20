var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '144.22.209.192',
  user     : 'admin',
  password : 'admin',
  database : 'dkfarmadbs',
  port: 3306
  
});

connection.connect();

connection.query('SELECT * from login', function(err, rows, fields) {
    if(err) console.log(err);
    console.log('The solution is: ', rows);
    connection.end();
});