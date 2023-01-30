const mysql  = require('mysql2');

const connection = mysql.createConnection({
    host: '', // your host
    user: '', // your user
    database: '', // your database
    password: '', // your password 
}).on('error', (error) => {
    console.log("Fail to connect database  - ", error);
});

module.exports = connection;