function PagamentoDao(connection) {
    this._connection = connection;
}

PagamentoDao.prototype.salva = (pagamento, callback) => {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.lista = (callback) => {
    this._connection.query('select * from pagamentos', callback);
}

PagamentoDao.prototype.buscaPorId = (id, callback) => {
    this._connection.query('select * from pagamentos where id = ?', id, callback);
}

