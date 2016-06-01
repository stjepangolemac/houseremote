'use strict'
const debug = require('debug')('scheduler');
const fs = require('fs');

var frequency = 1000;
var quit = false;
var db = undefined;

var currentSeconds = undefined;

function scheduling() {
  var time = new Date();
  currentSeconds = time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
  debug(currentSeconds);

  backupDB();
  if(!quit) setTimeout(scheduling, frequency)
}

function startScheduler() {
  loadDB();
  scheduling();
}

function stopScheduler() {
  quit = true;
}

// data management
function addTimer(timer) {
  if(db == (null || undefined)) return 'cannot add, database nonexistent';

  // timer checks
  if(!timer.hasOwnProperty('name') || typeof(timer.name) != 'string')
    return 'cannot add, timer does not have valid name property';
  if(!timer.hasOwnProperty('device') || typeof(timer.device) != 'string')
    return 'cannot add, timer does not have valid device property';
  if(!timer.hasOwnProperty('startTime') || typeof(timer.startTime) != 'number')
    return 'cannot add, timer does not have valid startTime property';
  if(!timer.hasOwnProperty('endTime') || typeof(timer.endTime) != 'number')
    return 'cannot add, timer does not have valid endTime property';
  if(!timer.hasOwnProperty('active') || typeof(timer.active) != 'boolean')
    return 'cannot add, timer does not have valid active property';
  if(!timer.hasOwnProperty('enabled') || typeof(timer.enabled) != 'boolean')
    return 'cannot add, timer does not have valid enabled property';

  if(timer.startTime > 86399 || timer.startTime < 0)
    return 'cannot add, timer property startTime is out of bounds';
  if(timer.endTime > 86399 || timer.endTime < 0)
    return 'cannot add, timer property endTime is out of bounds';

  if( Math.abs(timer.startTime - timer.endTime) < frequency)
    return 'cannot add, timer properties startTime and endTime are too close';
  // end of checks

  db.push(timer);
  return 'added new timer in database';
}

function removeTimer(timer) {
  if(db == (null || undefined)) return 'cannot remove, database nonexistent';

  var index = db.indexOf(timer);
  if(index == -1) return 'cannot remove, timer is not in database';

  if(db.splice(index, 1) != []) return 'removed timer from database';
  else return 'cannot remove';
}

function toggleEnabled(timer) {
  if(db == (null || undefined)) return 'cannot toggle, database nonexistent';

  var index = db.indexOf(timer);
  if(index == -1) return 'cannot toggle, timer is not in database';

  db[index].enabled = !db[index].enabled;
  return 'timer is toggled';
}

function listTimers() {
  if(db == (null || undefined)) return 'cannot list, database nonexistent';

  return db;
}

function triggerDevice(device) {

}

// database management
function createDB() {
  db = [];
  var exampleTimer = {
    name: 'example',
  	device: 'example1',
  	startTime: 49020, // 13:37 in seconds from midnight
  	endTime: 50400, // 14:00 in seconds from midnight
  	active: false,
  	enabled: false
  }
  db.push(exampleTimer);
  debug('database created and loaded');
}

function backupDB() {
  var backupdb = JSON.stringify(db);
  fs.writeFileSync('./scheduler/db.data', backupdb, { encoding: 'utf8'});
  debug('database saved');
}

function loadDB() {
  if(db == (null || undefined)) {
    try {
      var jsondb = fs.readFileSync('./scheduler/db.data', 'utf8');
    }
    catch (e) {
      if (e.code === 'ENOENT') {
        debug('database does not exist');
        createDB();
      }
      else {
        throw e;
      }
    }
    if(jsondb != (null || undefined)) {
      db = JSON.parse(jsondb);
      debug('database is loaded');
    }
  }
}


module.exports = { startScheduler, stopScheduler, addTimer }
