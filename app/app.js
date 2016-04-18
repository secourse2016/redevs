var express       = require('express');
var app           = express();
var bodyParser = require('body-parser');

require('dotenv').load();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

module.exports = app;
