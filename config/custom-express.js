var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = () => {
    var app = express();
    
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);

    return app;
}