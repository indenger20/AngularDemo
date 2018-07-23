const mysql = require('promise-mysql');
const config = require('../config/config');

const db_config = config.db;


const client = mysql.createConnection({
    host: db_config.config.host,
    user: db_config.user,
    password: db_config.pass,
    database: db_config.database
});

// client.connect();

module.exports = client;
