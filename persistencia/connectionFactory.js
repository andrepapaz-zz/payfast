var sql = require('mssql');
var config = require(`../config/env/${process.env.NODE_ENV || 'default'}.js`);

var config = config.dbConfig;

function getPool(callback) {
    var pool = new sql.ConnectionPool(config, err => {

        if (err) {
            console.log(err);
            return;
        }

        callback(pool);
    });

}

module.exports = () => {
    return getPool;
}