module.exports = ( app ) => {

    app.get( '/pagamentos', ( require, response ) => {
        console.log( 'Recebida.' );

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.lista( ( err, recordset ) => {
            if ( err ) {
                console.log( err );
                return;
            }

            response.send( recordset.recordset );
        } );
    } )

    app.post( '/pagamentos/pagamento', ( req, res ) => {
        let pagamento = req.body;

        if ( !Object.keys( pagamento ).length ) {
            throw new Error( 'Nenhum pagamento enviado.' );
        }

        console.log( 'processando um requisição de um novo pagamento.' );

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var pagamentoDao = new app.persistencia.PagamentoDao();

        pagamentoDao.salva( pagamento, ( err, resultado ) => {
            if ( err ) {
                console.log( err );
                return;
            }
            
            console.log( 'Pagamento criado com sucesso.' );
            res.json( pagamento );
        } );

    } )
}