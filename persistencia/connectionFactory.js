var mysql  = require('mysql');
var config = require(`../config/env/${process.env.NODE_ENV || 'default'}.js`);

var config = config.dbConfig;

function createDBConnection(){
    return mysql.createConnection(config);
}

module.exports = () => {
    return createDBConnection;
}