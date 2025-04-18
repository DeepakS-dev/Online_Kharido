const Usertable = require("../../Models/usertable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "1234567890";

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { firstname, lastname, email, mobile, dob, password } = req.body;
    const bcrypt_password = await bcrypt.hash(password, salt);
    const createUser = new Usertable({
      firstname,
      lastname,
      email,
      mobile,
      dob,
      password: bcrypt_password,
    });
    const resposnse = await createUser.save();
    const token = jwt.sign({ id: resposnse.id }, secretKey, {
      expiresIn: "1h",
    });

    // console.log("This is responseToken: ", token);
    return res.json({ status: true, data: resposnse, token: token });
  } catch (err) {
    console.log("err:", err);
    return res.status(500).json({ status: false, errors: err.errors });
  }
};

module.exports = register;
