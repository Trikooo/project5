const { genPassword } = require("../utils/passwordUtils.js");
const User = require("../models/user.model.js");

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.fields;
  if (password != confirmPassword)
    return res.status(400).json({ badRequest: "passwords don't match." });
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(409).json({ conflict: "user already exists." });
    } else {
      const saltHash = genPassword(password);
      const newUser = new User({
        username: username,
        email: email,
        ...saltHash,
      });
      newUser.save();
      res.status(200).json({ success: "user created successfully." });
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
    console.error(error);
  }
};

module.exports = { registerUser }
