module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        console.log('Recebida.');

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.lista((err, results, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            res.send(results);
        });
    });

    app.get('/pagamentos/pagamento/:id', (req, res) => {
        
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.buscaPorId(id, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            res.send(result[0]);
        });
    });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        
        var pagamento = {};

        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

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

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

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

        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        let pagamento = req.body.pagamento;

        if (!Object.keys(pagamento).length) {
            throw new Error('Nenhum pagamento enviado.');
        }

        console.log('processando um requisição de um novo pagamento.');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, (err, resultado) => {
            if (err) {
                console.log('Erro ao inserir no banco:' + err);
                res.status(500).send(err);
                return;
            }

            pagamento.id = resultado.insertId;

            console.log('Pagamento criado com sucesso.');
            res.location('/pagamentos/pagamento/' + pagamento.id);

            if (pagamento.forma_de_pagamento == 'cartao') {
                var cartao = req.body.cartao;

                console.log('cartão', cartao);

                var clienteCartoes = new app.servicos.clienteCartoes();

                clienteCartoes.autoriza(cartao, (errorCartoes, requestCartoes, responseCartoes, retornoCartoes) => {

                    if (errorCartoes) {
                        console.log(errorCartoes);

                        res.status(400).send(retornoCartoes);
                        return;
                    }

                    console.log(retornoCartoes);

                    var response = {
                        dados_do_pagamento: pagamento,
                        cartao: retornoCartoes,
                        links: [
                            {
                                href: `${req.protocol}://${req.hostname}:${process.env.PORT}/pagamentos/pagamento/${pagamento.id}`,
                                rel: 'confirmar',
                                method: 'PUT'
                            },
                            {
                                href: `${req.protocol}://${req.hostname}:${process.env.PORT}/pagamentos/pagamento/${pagamento.id}`,
                                rel: 'cancelar',
                                method: 'DELETE'
                            }
                        ]
                    }
        
                    res.status(201).json(response);
                    return;
                })
            } else {
                var response = {
                    dados_do_pagamento: pagamento,
                    links: [
                        {
                            href: `${req.protocol}://${req.hostname}:${process.env.PORT}/pagamentos/pagamento/${pagamento.id}`,
                            rel: 'confirmar',
                            method: 'PUT'
                        },
                        {
                            href: `${req.protocol}://${req.hostname}:${process.env.PORT}/pagamentos/pagamento/${pagamento.id}`,
                            rel: 'cancelar',
                            method: 'DELETE'
                        }
                    ]
                }
    
                res.status(201).json(response);
            }
        });

    })
}