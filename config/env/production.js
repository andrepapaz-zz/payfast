module.exports = {
    dbConfig: {
        user: 'root',
        password: 'root',
        host: 'payfast-db',
        database: 'payfast'
    },
    cardFastConfig: {
        host: 'cardfast',
        port: 3001
    },
    correiosSOAPConfig: {
        wsdl: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
    }
}