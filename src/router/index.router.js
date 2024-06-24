const Router = require("../../modules/Yaserver/Router.js");
const {registerRouter} = require("./register.router.js");
const {  loginRouter } = require("./login.router.js");

const router = new Router();
router.use(registerRouter, loginRouter)
module.exports = {router}