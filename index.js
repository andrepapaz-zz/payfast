var app = require('./config/custom-express')();

app.listen(process.env.PORT, () => {
    console.log(`Servidor executando na porta ${process.env.PORT} em ambiente de ${process.env.NODE_ENV}.`);
});