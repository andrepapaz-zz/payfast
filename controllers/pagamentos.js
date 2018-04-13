module.exports = (app) => {
    
    app.get('/pagamentos', (require, response) => {
        console.log('Recebida.');
        response.send('OK')
    })

    app.post('/pagamentos/pagamento', (req, res) => {
        let pagamento = req.body;

        console.log(pagamento);

        res.send('OK.');
    })
}