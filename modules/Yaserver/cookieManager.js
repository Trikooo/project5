const { signCookie } = require("./hashing");

/**
 * Parses cookies from the request headers.
 * @param {Object} req - The HTTP request object.
 * @returns {Object} An object containing parsed regular and signed cookies.
 */
function parseCookies(req) {
  const { cookie } = req.headers;
  let parsedCookies = {
    cookies: {},
    signedCookies: {},
  };

  if (cookie) {
    const cookieArray = cookie.split(";");
    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      const [name, value] = cookie.split("=");

      if (name) {
        if (!value.includes(".")) {
          parsedCookies.cookies[name] = value;
        } else {
          const [signedCookieValue, signature] = value.split(".");
          parsedCookies.signedCookies[name] = {
            value: signedCookieValue,
            signature: signature,
          };
        }
      }
    }
  }

  return parsedCookies;
}

/**
 * Generates a string representation of a cookie based on the provided options.
 * @param {Object} options - The options for creating the cookie string.
 * @param {string} options.key - The name of the cookie.
 * @param {string} options.value - The value of the cookie.
 * @param {string} [options.secretKey] - The secret key of the cookie.
 * @param {Date} [options.expires] - The expiration date of the cookie.
 * @param {number} [options.maxAge] - The maximum age of the cookie in seconds.
 * @param {string} [options.domain] - The domain associated with the cookie.
 * @param {string} [options.path] - The path within the domain where the cookie is valid.
 * @param {boolean} [options.secure] - Indicates if the cookie should only be sent over secure (HTTPS) connections.
 * @param {boolean} [options.httpOnly] - Indicates if the cookie should be inaccessible to client-side JavaScript.
 * @param {string} [options.sameSite] - Specifies the SameSite attribute of the cookie ('Strict', 'Lax', 'None').
 * @returns {string} The string representation of the cookie.
 */
function cookieStringifier(options = {}) {
  let cookieString = "";
  if (!options.secretKey) {
    cookieString = `${options.key}=${options.value}`;
  } else {
    cookieString = signCookie(options.key, options.value, options.secretKey)
  }

  if (options.expires)
    cookieString += `; Expires=${options.expires.toUTCString()}`;
  if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
  if (options.domain) cookieString += `; Domain=${options.domain}`;
  if (options.path) cookieString += `; Path=${options.path}`;
  if (options.secure) cookieString += `; Secure`;
  if (options.httpOnly) cookieString += `; HttpOnly`;
  if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;

  return cookieString;
}
module.exports = { parseCookies, cookieStringifier };
