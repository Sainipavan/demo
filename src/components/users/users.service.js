const User = require("./users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const doSignup = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  const savedUser = await newUser.save();
  delete savedUser.password;
  const jwtPayload = {
    userId: newUser._id,
  };
  const token = jwt.sign(jwtPayload, "PAVAN", {
    expiresIn: "2h",
  });
  return { savedUser, token };
};

const doLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  const jwtPayload = {
    userId: user._id,
  };

  const token = jwt.sign(jwtPayload, "PAVAN", { expiresIn: "2h" });
  return { token };
};

module.exports = {
  doSignup,
  doLogin,
};
