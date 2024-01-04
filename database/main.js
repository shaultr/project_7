const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'user_management',
    password: "1717"
});
module.exports = pool;