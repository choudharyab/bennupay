const bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;
var Promise = require('bluebird');
const crypto = require('crypto');


const getHash = (password) => {

    console.log('password is ' + password);

    return new Promise((resolve, reject) => {
        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash(password, salt, function (err, hash) {
        //         console.log('hash is ' + hash);
        //         if (!err) resolve(hash);
        //     });
        // });
        bcrypt.hash(password, SALT_WORK_FACTOR).then((hash) => {
            resolve(hash);
        }).catch((err) => {
            reject(err);
        })
    });
}


const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
            if (res) resolve(true);
            else resolve(false);
        });
    });
}

/*
this will do the aes-128-cbc encryption for the requests for bill-avenue
 */
const encrypt128CBC = async (plainText, workingKey) => {

    let m = crypto.createHash('md5');
    m.update(workingKey);
    let key = m.digest('buffer');
    let iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
};

/*
this will do the aes-128-cbc decryption for the requests for bill-avenue
*/

const decrypt128CBC = async (encText, workingKey) => {

    let m = crypto.createHash('md5');
    m.update(workingKey)
    let key = m.digest('buffer');
    let iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(encText,'hex','utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

module.exports = {
    getHash,
    comparePassword,
    encrypt128CBC,
    decrypt128CBC
};