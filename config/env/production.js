module.exports = {
    dbConfig: {
        user: 'root',
        password: 'root',
        host: 'payfast_db',
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