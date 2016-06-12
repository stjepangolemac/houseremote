'use strict';
var debug = require('debug')('msgcontroller');
const express = require('express');
const bodyParser = require('body-parser');

var aes = require('../security/aes.js');
var scheduler = require('../scheduler/scheduler.js');
var tmplcheck = require('../security/tmplcheck.js');

var receive = function (req, res, next) {
    debug('received from ip: ' + req.ip + ', msg length: ' + req.body.length);

    var ciphermsg = req.body;
    ciphermsg = ciphermsg.substring(0, ciphermsg.length-1);

    var plainmsg = aes.decrypt(ciphermsg);

    if(plainmsg[0]) {
        debug('decrypted message: ' + plainmsg[1]);
        var check = tmplcheck.check(plainmsg[1]);
        if(check[0]) {
            // plainmsg[1] is OK
            if(plainmsg[1].command == 'add') scheduler.addTimer(plainmsg[1].timer);

            res.send(aes.encrypt(check[1]));
        }
        else res.send(aes.encrypt(check[1]));
    }
    else {
        debug('bad decrypt: ' + plainmsg[1]);
        res.send(aes.encrypt(plainmsg[1]));
    }
    
};

module.exports = { receive: receive };