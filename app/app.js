var express       = require('express');
var app           = express();
var bodyParser = require('body-parser');
var cors = require('cors');

require('dotenv').load();
app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

module.exports = app;
