'use strict'
const debug = require('debug')('server');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const PORT = 3000;

var aes = require('./security/aes.js');
var scheduler = require('./scheduler/scheduler.js');
var msgController = require('./middleware/msgController.js');

// Use body parser
app.use(bodyParser.text());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Incoming message
app.post('/', msgController.receive);

aes.loadSecret();
scheduler.startScheduler();
app.listen(PORT || 3000, function () {
    debug('started listening on port ' + PORT);
});
