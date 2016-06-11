'use strict'
const debug = require('debug')('server');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const PORT = 3000;

var aes = require('./security/aes.js');
var scheduler = require('./scheduler/scheduler.js');

// Use body parser
app.use(bodyParser.text());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Incoming message
app.post('/', function (req ,res) {
  debug('POST:' + ' ip:' + req.ip + ' msg:' + req.body);

  var ciphermsg = req.body;
  var ciphermsg = ciphermsg.substring(0, ciphermsg.length-1);

  var plainmsg = aes.decrypt(ciphermsg);
  debug('Received msg: ' + ciphermsg.length);


  if(plainmsg[0]) {
    debug('Decrypted: ' + plainmsg[1]);
    res.send(aes.encrypt('ok'));
  }
  else res.send(aes.encrypt(plainmsg[1]));
});

aes.loadSecret();
scheduler.startScheduler();
app.listen(PORT || 3000, function () {
  debug('started listening on port ' + PORT);
});


for (var i = 0; i < 10; i++) {
  var d = new Date();
  var exampleTimer = {
    name: 'glodji' + i,
    device: '123asdasd',
    startTime: d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + 5,
    endTime: d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + 10,
    active: false,
    enabled: true
  }
  debug(scheduler.addTimer(exampleTimer));
}
