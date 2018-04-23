var app = require('./config/custom-express')();
var porta = process.env.PORT || 3000;


app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta} em ambiente de ${process.env.NODE_ENV}.`);
});