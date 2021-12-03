const crypto = require('crypto');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt= require('./decrypt');

const recievedData=require('./signedMessage').packageOfDataToSend;


const hash = crypto.createHash(recievedData.algorithm);
const publicKey=fs.readFileSync(__dirname +'/id_rsa_pub.pem','utf8');

const decryptedMessage=decrypt.decryptWithPublicKey(publicKey,recievedData.signedAndEncryptedData);

const decryptedMessageHex=decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(recievedData.originalData));

const hashOfOriginalHex = hash.digest('hex');

if(hashOfOriginalHex=== decryptedMessageHex){
    console.log("Success! data has not been tempered with and the sender is valid")

}
else{
    console.log('No some one is trying to manipulate the data ')
}