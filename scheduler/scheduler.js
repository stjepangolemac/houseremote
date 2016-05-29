'use strict'
const debug = require('debug')('scheduler');
const fs = require('fs');

var frequency = 1000;
var quit = false;
var db = undefined;

function scheduling() {
  debug('scheduling');

  var backupdb = JSON.stringify(db);
  fs.writeFileSync('./scheduler/db.data', backupdb, { encoding: 'utf8'});

  if(!quit) setTimeout(scheduling, frequency)
}

function startScheduler() {
  var jsondb = fs.readFileSync('./scheduler/db.data', 'utf8');
  db = JSON.parse(jsondb);
  debug(JSON.stringify(db));

  scheduling();
}

function stopScheduler() {
  quit = true;
}

function addTimer(timer) {

}

function removeTimer(timer) {

}

function toggleEnabled(timer) {

}

function listTimers() {

}

function triggerDevice(device) {

}


module.exports = { startScheduler }
