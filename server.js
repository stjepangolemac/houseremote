'use strict'
const debug = require('debug')('server');
const express = require('express');
var Base64 = require('js-base64').Base64;

var app = express();
const PORT = 3000;

var aes = require('./security/aes.js');
aes.loadSecret();
var scheduler = require('./scheduler/scheduler.js');
scheduler.startScheduler();

// INCOMING COMMAND
app.get('/', function (req, res) {
  if(req.get('command') == (undefined || null || '')) {
    debug('GET:' + ' ip:' + req.ip + ' head:no');
    res.send(aes.encrypt('No command in header!'));
  }
  else {
    var deciphercommand = aes.decrypt(req.get('command'));
    debug('method:GET' + ' ip:' + req.ip + ' command:' + deciphercommand);
    res.send(aes.encrypt('Ok'));
  }
});

app.listen(PORT || 3000, function () {
  debug('listening on port 3000');
});
