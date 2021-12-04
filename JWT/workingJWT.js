const base64 = require("base64url");
const crypto = require("crypto");
const signatureFunction = crypto.createSign("RSA-SHA256");
const fs = require("fs");
const headerObj = {
    alg: "RS256",
    typ: "JWT",
};
const payloadObj = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022,
};
const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64(headerObjString);
const base64UrlPayload = base64(payloadObjString);

signatureFunction.write(base64UrlHeader + "." + base64UrlPayload);
signatureFunction.end();

// The private key without line breaks
const PRIV_KEY = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");
// Will sign our data and return Base64 signature (not the same as Base64Url!)
const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");
const signatureBase64Url = base64.fromBase64(signatureBase64);
console.log(signatureBase64Url);


//Verification
const verifyFunction = crypto.createVerify("RSA-SHA256");
const JWT =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA";

const PUB_KEY = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const jwtHeader = JWT.split(".")[0];
const jwtPayload = JWT.split(".")[1];
const jwtSignature = JWT.split(".")[2];

verifyFunction.write(jwtHeader + "." + jwtPayload);
verifyFunction.end();

const jwtSignatureBase64 = base64.toBase64(jwtSignature);

const signatureIsValid = verifyFunction.verify(
    PUB_KEY,
    jwtSignatureBase64,
    "base64"
);
console.log(signatureIsValid);