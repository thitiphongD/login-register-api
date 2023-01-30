const mysql  = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'NODE_AUTH_API',
    password: 'password',
}).on('error', (error) => {
    console.log("Fail to connect database  - ", error);
});

module.exports = connection;