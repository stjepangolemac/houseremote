'use strict'
const debug = require('debug')('encryption');
const fs = require('fs');

var cryptLib = require('./dist/CryptLib.js');
var key = undefined;
var secretLoaded = false;

function loadSecret() {
  var temp = fs.readFileSync('security/secret.txt');
  var temp = temp.toString().substring(0,temp.length-1);

  key = cryptLib.getHashSha256(temp, 32);
  secretLoaded = true;
  debug('secret loaded successfully');
}

function encrypt(plaintext) {
  if(!secretLoaded) return 'Cannot encrypt, key not loaded';
  var iv = cryptLib.generateRandomIV(16); //16 bytes = 128 bit
  return iv + cryptLib.encrypt(plaintext, key, iv);
}

function decrypt(ciphertext) {
  var result = [false, ''];

  if(!secretLoaded) {
    result[0] = false;
    result[1] = 'Cannot decrypt, key not loaded';
    return result;
  }
  if(ciphertext.length < 16) {
    result[0] = false;
    result[1] = 'Cannot decrypt, invalid message length1';
    return result;
  }

  var iv = ciphertext.substring(0,16);
  var cipher = ciphertext.substring(16, ciphertext.length);

  /*if((iv.length != 16) || ((cipher.length % 24) != 0)) {
    result[0] = false;
    result[1] = 'Cannot decrypt, invalid message length2';
    return result;
  }*/

  debug('iv: ' + iv.length + iv + ' rest: ' + cipher.length + cipher);
  debug('Decrypt successfull');

  result[0] = true;
  result[1] = cryptLib.decrypt(cipher, key, iv);;

  return result;
}

/*
var cip = encrypt('jeboteja');
console.log(cip);
console.log(decrypt(cip));
*/

module.exports = { encrypt, decrypt, loadSecret }
