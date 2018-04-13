var express = require('express');
var consign = require('consign');

module.exports = () => {
    var app = express();
    
    consign()
        .include('controllers')
        .into(app);

    return app;
}