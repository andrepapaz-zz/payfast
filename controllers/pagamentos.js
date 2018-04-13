module.exports = (app) => {
    
    app.get('/pagamentos', (require, response) => {
        console.log('Recebida.');
        response.send('OK')
    })

    app.post('/pagamentos/pagamento', (req, res) => {
        let pagamento = req.body;

        if (!Object.keys(pagamento).length) {
            throw new Error('Nenhum pagamento enviado.');
        }

        console.log('processando um requisição de um novo pagamento.');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, (erro, resultado) => {
            console.log('Pagamento criado com sucesso.');
            res.json(pagamento);
        });

    })
}