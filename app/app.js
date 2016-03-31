var express       = require('express');
var app           = express();

app.use(express.static('public'));
require('./routes')(app);

module.exports = app;
