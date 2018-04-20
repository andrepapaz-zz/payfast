var connectionFactory = require('./connectionFactory')();
var sql = require('mssql');
var moment = require('moment');

function PagamentoDao() {
}

PagamentoDao.prototype.salva = (pagamento, callback) => {
    connectionFactory((pool) => {
        var insert = `INSERT INTO 
                        pagamentos 
                            (
                                forma_de_pagamento, 
                                valor, 
                                moeda, 
                                status, 
                                data, 
                                descricao
                            ) 
                        values
                            (
                                '${pagamento.forma_de_pagamento}', 
                                ${pagamento.valor}, 
                                '${pagamento.moeda}', 
                                '${pagamento.status}', 
                                '${moment(pagamento.data).format('YYYY-MM-DD')}', 
                                '${pagamento.descricao}'
                            );
                        select @@IDENTITY AS 'identity'`;

        pool.request().query(insert, callback);
    });
}

PagamentoDao.prototype.lista = (callback) => {
    connectionFactory((pool) => {
        pool.request().query('select * from pagamentos', callback);
    });
}

PagamentoDao.prototype.buscaPorId = (id, callback) => {
    connectionFactory((pool) => {
        pool.request().query(`select * from pagamentos where id = ${id}`, callback);
    });
}

PagamentoDao.prototype.atualiza = (pagamento, callback) => {
    connectionFactory((pool) => {

        var update = `UPDATE
                            pagamentos
                        SET
                            status = '${pagamento.status}'
                        WHERE
                            id = ${pagamento.id}`;

        pool.request().query(update, callback);
    });
}

module.exports = function() {
    return PagamentoDao;
};