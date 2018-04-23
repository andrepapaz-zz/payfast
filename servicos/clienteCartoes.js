var restify = require('restify-clients');
var config = require(`../config/env/${process.env.NODE_ENV || 'default'}.js`);

function CartoesClient() {
    this._cliente = restify.createJsonClient({
        url: `http://${config.cardFastConfig.host}:${config.cardFastConfig.port}`
    });
}

CartoesClient.prototype.autoriza = function(cartao, callback){
    this._cliente.post('/cartoes/autoriza', cartao,  callback);
}

module.exports = function(){
    return CartoesClient;
}