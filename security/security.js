'use strict'
const debug = require('debug')('security');
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-128-ecb';

var secretLoaded = false;
var key = undefined;

function loadSecret() {
  key = fs.readFileSync('security/secret.txt');
  //key = new Buffer(crypto.pbkdf2Sync(password, 'japan', 10000, 16, 'sha1'));
  secretLoaded = true;
  debug('secret loaded successfully' + 'key: ' + key);
}

function encrypt(iv, plaintext, callback) {
  if(!secretLoaded) return 'Key is not loaded!'
    try {
      var cipher = crypto.createCipher(algorithm, key);
      var ciphertext = cipher.update(plaintext,'utf8','hex');
      ciphertext += cipher.final('hex');
      if (callback) callback(null, ciphertext);
      debug('encrypted successfully');
      return ciphertext; //.toString('utf8'); // Backward compatibility
    } catch(err) {
      if (callback) callback(err);
      return;
    }
}

function decrypt(iv, ciphertext, callback) {
  if(!secretLoaded) return 'Key is not loaded!'
    try {
      var decipher = crypto.createDecipher(algorithm, key);
      var plaintext = decipher.update(ciphertext, 'hex', 'utf8');
      plaintext += decipher.final('utf8');
      if (callback) callback(null, plaintext);
      debug('decrypted successfully');
      return plaintext; // Backward compatibility
    } catch(err) {
      if (callback) callback(err);
      return;
    }
}

function setAlgorithm(_algorithm) {
  if ( typeof _algorithm != undefined && (crypto.getCiphers().indexOf(_algorithm) !== -1) ) {
    algorithm = _algorithm;
  }
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    setAlgorithm: setAlgorithm,
    loadSecret: loadSecret
};
/*
loadSecret();
var plain = 'tesla voli masla';

var cipher = encrypt('', plain);
console.log('Cipher: ' + cipher);

var decipher = decrypt('', cipher);
console.log('Decipher: ' + decipher);*/
