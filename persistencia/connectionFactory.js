var sql = require('mssql');

var config = {
    user: 'sa',
    password: '',
    server: 'localhost',
    database: 'payfast'
};

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