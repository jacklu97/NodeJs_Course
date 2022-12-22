const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'my_user',
    database: 'app_db',
    password: '123456789',
    port: 6033
});

module.exports = pool.promise();