'use strict';
var debug = require('debug')('msgcontroller');
const express = require('express');
const bodyParser = require('body-parser');

var aes = require('../security/aes.js');
var scheduler = require('../scheduler/scheduler.js');
var tmplcheck = require('../security/tmplcheck.js');

var receive = function (req, res, next) {
    debug('received from ip: ' + req.ip + ', msg length: ' + req.body.length + ' msg: ' + req.body);

    if(req.body == undefined) res.send(aes.encrypt('invalid'));
    else {
        var ciphermsg = req.body;
        ciphermsg = ciphermsg.substring(0, ciphermsg.length - 1);

        var plainmsg = aes.decrypt(ciphermsg);

        if (plainmsg[0]) {
            debug('decrypted message: ' + plainmsg[1]);
            var parsedmsg = JSON.parse(plainmsg[1]);
            var check = tmplcheck.check(parsedmsg);
            if (check[0]) {
                // plainmsg[1] is OK
                var response;
                if (plainmsg[1].command == 'add') response = scheduler.addTimer(plainmsg[1].timer);
                else if (plainmsg[1].command == 'remove') response = scheduler.removeTimer(plainmsg[1].timer);
                else if (plainmsg[1].command == 'list') response = scheduler.listTimers();
                else if (plainmsg[1].command == 'trigger') response = scheduler.triggerDevice(plainmsg[1].device);
                else if (plainmsg[1].command == 'toggle') response = scheduler.toggleEnabled(plainmsg[1].timer);

                if (response[0]) {
                    debug('command valid: ' + response[1]);
                    res.send(aes.encrypt('ok'));
                }
                else {
                    debug('command invalid: ' + response[1]);
                    res.send(aes.encrypt(response[1]));
                }
            }
            else res.send(aes.encrypt(check[1]));
        }
        else {
            debug('bad decrypt: ' + plainmsg[1]);
            res.send(aes.encrypt(plainmsg[1]));
        }
    }
    
};

module.exports = { receive: receive };