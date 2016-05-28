'use strict'
const debug = require('debug')('encryption');
const fs = require('fs');

var cryptLib = require('./dist/CryptLib.js');

var key = undefined;
var secretLoaded = false;

function loadSecret() {
  key = cryptLib.getHashSha256('my secret key', 32);
  secretLoaded = true;
  debug('secret loaded successfully ' + 'key: ' + key);
}

function encrypt(plaintext) {
  if(!secretLoaded) return 'Cannot encrypt, key not loaded';
  var iv = cryptLib.generateRandomIV(16); //16 bytes = 128 bit
  return iv + cryptLib.encrypt(plaintext, key, iv);
}

function decrypt(ciphertext) {
  if(!secretLoaded) return 'Cannot decrypt, key not loaded';
  if(ciphertext.length < 16) return 'Invalid message';

  var iv = ciphertext.substring(0,16);
  var cipher = ciphertext.substring(16, ciphertext.length);

  if((iv.length != 16) || ((cipher.length % 24) != 0)) return 'Invalid message';

  debug('iv: ' + iv.length + iv + 'rest: ' + cipher.length + cipher);
  return cryptLib.decrypt(cipher, key, iv);
}

/*
var cip = encrypt('jeboteja');
console.log(cip);
console.log(decrypt(cip));
*/

module.exports = { encrypt, decrypt, loadSecret }
