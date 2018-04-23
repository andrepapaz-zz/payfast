var soap = require('soap');
var config = require(`../config/env/${process.env.NODE_ENV || 'default'}.js`);

function ClienteCorreiosSOAP() {
    this._url = config.correiosSOAPConfig.wsdl;
}

ClienteCorreiosSOAP.prototype.calculaPrazo = function(dados, callback) {

    soap.createClient(this._url, function(err, cliente) {
        if (err) {
            console.log(err);
        }
        console.log('cliente soap criado');

        cliente.CalcPrazo(dados, callback);
    })
}

module.exports = function() {
    return ClienteCorreiosSOAP;
}