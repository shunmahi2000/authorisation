const fs=require('fs');
const encrypt=require('./encrypt');
const decrypt=require('./decrypt');

const publicKey=fs.readFileSync(__dirname +'/id_rsa_pub.pem','utf8');

const encryptedMessage=encrypt.encryptionWithPublicKey(publicKey,"Super secret Meassage");

console.log(encryptedMessage.toString());

const privateKey=fs.readFileSync(__dirname+ "/id_rsa_priv.pem",'utf8');

const decryptedMessage= decrypt.decryptWithPrivateKey(privateKey,encryptedMessage);

console.log(decryptedMessage.toString());
