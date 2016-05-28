'use strict'

var msg = {
  command: 'add',  // can be add, remove, list, trigger
  timer: {         // for add, remove, can be undefined
    name: 'kap po kap',
    device: 'ventil1',
    startTime: '(18) * 60 * 60 + (0) * 60 * 60', // 18:00
    endTime: '(18) * 60 * 60 + (30) * 6 * 60',   // 18:30
    active: 'false';
  },
  device: 'garaza1',      // for trigger, can be undefined
  counter: '125323';      // anti replay attack
}
