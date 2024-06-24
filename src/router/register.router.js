const Router = require("../../modules/Yaserver/Router.js");
const { formidable } = require("formidable");
const path = require("node:path");
const fs = require("node:fs");

const router = new Router();

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.post("/register", (req, res) => {
  res.send(req.body);
});

router.get("/api/products/create", (req, res) => {
  res.render("createProduct.html");
});

router.post("/api/products/create", (req, res) => {
  // eslint-disable-next-line no-undef
  const uploadDir = path.join(__dirname, "../../uploads");

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(files);
  });
});

module.exports = { registerRouter: router };
