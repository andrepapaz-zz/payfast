module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        console.log('Recebida.');

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.lista((err, recordset) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            res.send(recordset.recordset);
        });
    });

    app.get('/pagamentos/pagamento/:id', (req, res) => {
        
        var id = req.params.id;

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.buscaPorId(id, (err, recordset) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            res.send(recordset.recordset[0]);
        });
    });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        
        var pagamento = {};

        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.atualiza(pagamento, (err) => {
            if (err) {
                console.log('Erro ao dar update no banco:' + err);
                res.status(500).send(err);
                return;
            }

            res.send(pagamento);
        })

        
    });

    app.delete('/pagamentos/pagamento/:id', (req, res) => {
        
        var pagamento = {};

        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.atualiza(pagamento, (err) => {
            if (err) {
                console.log('Erro ao dar update no banco:' + err);
                res.status(500).send(err);
                return;
            }

            res.status(204).send(pagamento);
        })
    });

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
                res.status(500).send(err);
                return;
            }

            console.log('Pagamento criado com sucesso.');
            res.location('/pagamentos/pagamento/' + resultado.recordset[0].identity)
            res.status(201).json(pagamento);
        });

    })
}