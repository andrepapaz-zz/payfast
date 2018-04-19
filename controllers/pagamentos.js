module.exports = (app) => {

    app.get('/pagamentos', (require, response) => {
        console.log('Recebida.');

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.lista((err, recordset) => {
            if (err) {
                console.log(err);
                return;
            }

            response.send(recordset.recordset);
        });
    })

    app.post('/pagamentos/pagamento', (req, res) => {

        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        let pagamento = req.body;

        if (!Object.keys(pagamento).length) {
            throw new Error('Nenhum pagamento enviado.');
        }

        console.log('processando um requisição de um novo pagamento.');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.salva(pagamento, (err, resultado) => {
            if (err) {
                console.log('Erro ao inserir no banco:' + err);
                res.status(400).send(err);
                return;
            }

            console.log('Pagamento criado com sucesso.');
            res.json(pagamento);
        });

    })
}