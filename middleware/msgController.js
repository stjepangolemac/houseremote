'use strict';
var debug = require('debug')('msgcontroller');
const express = require('express');
const bodyParser = require('body-parser');

var aes = require('../security/aes.js');
var scheduler = require('../scheduler/scheduler.js');
var tmplcheck = require('../security/tmplcheck.js');

app.use(bodyParser.text());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var receive = function (req, res, next) {
    debug('received from ip: ' + req.ip + ', msg length: ' + req.body.length);

    var ciphermsg = req.body;
    if(ciphermsg.length == (0 || undefined || null)) res.send('invalid');
    else {
        ciphermsg = ciphermsg.substring(0, ciphermsg.length - 1);

        var plainmsg = (ciphermsg);

        if (plainmsg[0]) {
            debug('decrypted message: ' + plainmsg[1]);
            var check = tmplcheck.check(plainmsg[1]);
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