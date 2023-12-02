const mysql = require('mysql');

require('dotenv').config();
let con;
const user = process.env.USER;

function handleDisconnect() {
    console.log(process.env.HOST, user, process.env.PASSWORD, process.env.DATABASE);
    con = mysql.createConnection({
        host: process.env.HOST,
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    con.connect((err) => {
        if(err) {
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    con.on('error', (err) => {
        console.log('Database error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = con;