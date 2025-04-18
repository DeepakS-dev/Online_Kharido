const Usertable = require("../../Models/usertable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "1234567890";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usertable.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Credential" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Email or password is incorrect....",
        });
      } else {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "100h",
        });
        return res
          .status(200)
          .json({
            status: true,
            message: "Login Successfull",
            token: token,
            user,
          });
      }
    }
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: false, errors: error.errors });
  }
};

module.exports = login;
