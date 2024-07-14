const Router = require("../../modules/Yaserver/Router.js");
const auth = require("../auth/auth.js");
const router = new Router();

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", auth.authenticate(), (req, res) => {
  res.json({ user: req.user, session: req.session });
});
module.exports = { loginRouter: router };
