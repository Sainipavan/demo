const { doLogin, doSignup } = require("./users.service");

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await doSignup({ name, email, password });
    return res.status(201).json({
      user,
      message: "signUp successful",
    });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await doLogin({ email, password });
    return res.status(200).json({
      ...user,
      message: "login successful",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signUp,
  login,
};
