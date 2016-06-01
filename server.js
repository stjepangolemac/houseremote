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

// Incoming message
app.get('/', function (req, res) {
  if(req.get('command') == (undefined || null || '')) { // NO COMMAND
    debug('GET:' + ' ip:' + req.ip + ' head:no');
    res.send(aes.encrypt('No command in header!'));
  }
  else { // Valid command
    var deciphercommand = aes.decrypt(req.get('command'));

    debug('method:GET' + ' ip:' + req.ip + ' command:' + deciphercommand[1]);
    if(deciphercommand[0]) res.send(aes.encrypt('Ok'))
    else res.send(aes.encrypt(deciphercommand[1]));
  }
});

aes.loadSecret();
scheduler.startScheduler();
app.listen(PORT || 3000, function () {
  debug('started listening on port ' + PORT);
});

var exampleTimer = {
  name: 'lalasdasdsa',
  device: '123asdasd',
  startTime: 49020, // 13:37 in seconds from midnight
  endTime: 50400, // 14:00 in seconds from midnight
  active: false,
  enabled: false
}


debug(scheduler.addTimer(exampleTimer));
