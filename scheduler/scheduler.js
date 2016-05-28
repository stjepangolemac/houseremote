'use strict'
const debug = require('debug')('scheduler');
const fs = require('fs');

var frequency = 1000;
var quit = false;
var db = undefined;

function scheduling() {
  debug('scheduling');
  /*var _db = fs.readFileSync('./db.json');
  db = JSON.parse(_db);

  if(time.now >= timer.starttime && timer.active == false) timer.active = true
  if(time.now >= timer.endtime && timer.active == true) timer.active = false
*/
  if(!quit) setTimeout(scheduling, frequency)
}

function startScheduler() {
  scheduling();
}
function stopScheduler() {
  quit = true;
}
module.exports = { startScheduler }
