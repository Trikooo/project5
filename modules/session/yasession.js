const Store = require("../sessionStore/store.js");
const { generateId } = require("../Yaserver/hashing.js");

/**
 * @typedef {Object} SessionOptions
 * @property {boolean} [resave] - Forces the session to be saved back to the session store, even if the session was never modified during the request.
 * @property {boolean} [saveUninitialized] - Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
 * @property {any} [store] - setup a store for your session
 * @property {Object} cookie - Options for setting the session cookie.
 * @property {string} [cookie.key] - The name of the session cookie.
 * @property {string} cookie.secretKey - A secret key for signing the session ID cookie.
 * @property {Date} [cookie.expires] - The expiration date of the cookie. If not specified, the cookie will be a session cookie.
 * @property {number} [cookie.maxAge] - The maximum age of the cookie in milliseconds.
 * @property {string} [cookie.domain] - The domain for which the cookie is valid.
 * @property {string} [cookie.path] - The path within the domain for which the cookie is valid.
 * @property {boolean} [cookie.secure] - Indicates if the cookie should only be sent over secure (HTTPS) connections.
 * @property {boolean} [cookie.httpOnly] - Indicates if the cookie is inaccessible to client-side JavaScript.
 * @property {string} [cookie.sameSite] - Specifies the SameSite attribute of the cookie ('Strict', 'Lax', 'None').
 */

/**
 * Function to setup session middleware.
 * @param {SessionOptions} options - Options for session setup.
 * @returns {function} Middleware function for session handling.
 */
function yasession(options) {
  let expirationDate
  if (!options.cookie.key) options.cookie.key = "connect.sid";
  options.cookie.value = generateId();
  if (!options.cookie.secretKey)
    throw new Error("a secretKey for the session must be provided");
  if(!options.cookie.expires){
    if(options.cookie.maxAge){
      expirationDate = new Date(Date.now() + options.cookie.maxAge);
    }
    expirationDate = null;
  }else{
    expirationDate = options.cookie.expires
  }
  return (req, res, next) => {
    res.signedCookie(options.cookie);
    req.session = {
      sid: options.cookie.value,
      data: {},
      expiration: expirationDate
    };
    const {sid, data, expiration} = req.session
    const store = new Store(options.store);
    store.set(sid, data, expiration)
    next();
  };
}

module.exports = { yasession };
