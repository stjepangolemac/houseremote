'use strict'
var fs = require('fs');

var db = [
  {         // for add, remove, can be undefined
    name: 'kap po kap',
    device: 'ventil1',
    startTime: '(18) * 60 * 60 + (0) * 60', // 18:00
    endTime: '(18) * 60 * 60 + (30) * 60',   // 18:30
    active: 'false',
    enabled : 'true'
  },
  {         // for add, remove, can be undefined
    name: 'prskalice ledina',
    device: 'ventil2',
    startTime: '(20) * 60 * 60 + (0) * 60', // 20:00
    endTime: '(20) * 60 * 60 + (20) * 60',   // 20:20
    active: 'false',
    enabled : 'true'
  },
  {         // for add, remove, can be undefined
    name: 'bazen svjetlo',
    device: 'prekidac1',
    startTime: '(21) * 60 * 60 + (0) * 60', // 21:00
    endTime: '(6) * 60 * 60 + (0) * 60',   // 06:00
    active: 'false',
    enabled : 'true'
  },
]

var jsondb = JSON.stringify(db);

fs.writeFileSync('db.data', jsondb);
