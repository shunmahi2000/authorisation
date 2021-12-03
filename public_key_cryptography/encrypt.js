const crypto = require('crypto');

function encryptionWithPublicKey(publicKey,message){
    const bufferMessage=Buffer.from(message,'utf8');
    return crypto.publicEncrypt(publicKey,bufferMessage);
}

function encryptionWithPrivateKey(privateKey,message){
    const bufferMessage=Buffer.from(message,'utf8');
    return crypto.privateEncrypt(privateKey,bufferMessage);
}
module.exports.encryptionWithPublicKey=encryptionWithPublicKey;
module.exports.encryptionWithPrivateKey=encryptionWithPrivateKey;