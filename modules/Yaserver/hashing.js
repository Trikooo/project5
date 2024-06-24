const crypto = require("node:crypto");

/**
 * Signs a cookie value using an HMAC-SHA256 signature.
 * @param {string} key - The key of the cookie.
 * @param {string} value - The value of the cookie to be signed.
 * @param {string} secretKey - The secret key used for signing the cookie.
 * @returns {string} The signed cookie string in the format 'key=value.signature'.
 */
function signCookie(key, value, secretKey) {
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(value)
    .digest("base64");
  return `${key}=${value}.${signature}`;
}

/**
 * Verifies the signature of a signed cookie value.
 * @param {string} signedValue - The signed cookie value in the format 'value.signature'.
 * @param {string} secretKey - The secret key used for signing the cookie.
 * @returns {boolean} True if the signature is valid, false otherwise.
 */
function verifySignedCookie(signedValue, secretKey) {
  const [value, signature] = signedValue.split(".");
  const signatureToVerify = crypto
    .createHmac("sha256", secretKey)
    .update(value)
    .digest("base64");
  return signature === signatureToVerify;
}

/**
 * Generates a random ID.
 * @returns {string} The randomly generated ID.
 */
function generateId() {
  const id = crypto.randomBytes(16).toString("hex");
  return id;
}

module.exports = { signCookie, verifySignedCookie, generateId };
