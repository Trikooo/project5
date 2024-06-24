const queryString = require("node:querystring");
const fs = require("node:fs");
function parse(req) {
  if (req.headers["content-type"]) {
    if (req.headers["content-type"] === "application/json") {
      req.body = parseJson(req.body);
      return req.body;
    } else if (
      req.headers["content-type"] === "application/x-www-form-urlencoded"
    ) {
      req.body = parseUrlEncoded(req.body);
      return req.body;
    } else if (req.headers["content-type"].startsWith("multipart/form-data")) {
      req.body = parseMultipartFormData(req);
      return req.body;
    }
  }
  return req.body;
}

function parseJson(body) {
  try {
    body = JSON.parse(body);
    return body;
  } catch (error) {
    throw new Error(error);
  }
}

function parseUrlEncoded(body) {
  try {
    body = queryString.parse(body);
    return body;
  } catch (error) {
    throw new Error(error);
  }
}

function parseMultipartFormData(req) {
  let body = req.body;
  let rawBody = body
  const stinkBody = "\r\n" + rawBody
  console.log(stinkBody.charCodeAt(0), stinkBody.charCodeAt(1));
  const boundary = body.split(/\r?\n|\r/, 1)[0];
  
  body = body.split(boundary);
  body.shift();
  body.pop();
  let parsedData = {};

  for (let part of body) {
    part = part.trim();

    if (part.includes("filename")) {
      const fileRegex = /name="(.+)"; filename="(.+)"\r?\nContent-Type: (\w+\/\w+)(?:\r?\n)*([\s\S]*)/;
      const match = fileRegex.exec(part);
      if (match) {
        parsedData[match[1]] = {
          filename: match[2],
          contentType: match[3],
          contentData: match[4],
        };
      }

    } else {
      part = part.replace(/\r?\n|\r/g, "");
      const regex = /name="(.+)"(.+)/;
      const match = regex.exec(part);
      if (match) {
        parsedData[match[1]] = match[2];
      }
    }
  }

  // Write file if productImage exists
  if (parsedData.productImage && parsedData.productImage.contentData) {
    const imageData = Buffer.from(parsedData.productImage.contentData, "latin1")
    const filename = parsedData.productImage.filename;

fs.writeFile(filename, imageData, "latin1", (err) => {
  if (err) {
    console.error('Error saving image:', err);
  } else {
    console.log('Image saved successfully.');
  }
});
  }

  return parsedData;
}

module.exports = { parse };





