'use strict';
var debug = require('debug')('msgcontroller');
const express = require('express');
const bodyParser = require('body-parser');

var aes = require('../security/aes.js');

var receive = function (req, res, next) {
    debug('received from ip: ' + req.ip + ', msg length: ' + req.body.length);

    var ciphermsg = req.body;
    ciphermsg = ciphermsg.substring(0, ciphermsg.length-1);

    var plainmsg = aes.decrypt(ciphermsg);

    if(plainmsg[0]) {
        debug('decrypted message: ' + plainmsg[1]);
        res.send(aes.encrypt('ok'));
    }
    else {
        debug('bad decrypt');
        res.send(aes.encrypt(plainmsg[1]));
    }
};

module.exports = { receive: receive };