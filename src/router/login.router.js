const Router = require("../../modules/Yaserver/Router.js");

const router = new Router();

router.get("/login", (req, res)=>{
    res.render("login.html")
})
module.exports = {loginRouter: router}