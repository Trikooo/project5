const Auth2 = require("../../modules/localAuth/localAuth.js");
const User = require("../models/user.model.js");

const auth = new Auth2({User: User})

module.exports = auth