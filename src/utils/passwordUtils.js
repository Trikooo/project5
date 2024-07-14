const crypto = require("node:crypto");

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { salt: salt, hash: hash };
};

const verifyPassword = (salt, hash, password) => {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashToVerify;
};

module.exports = { genPassword, verifyPassword };
