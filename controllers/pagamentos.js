module.exports = (app) => {
    
    app.get('/pagamentos', (require, response) => {
        console.log('Recebida.');
        response.send('OK')
    })
    
}