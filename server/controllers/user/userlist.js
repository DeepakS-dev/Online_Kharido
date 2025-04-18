const Usertable = require("../../Models/usertable");

const userslist = async (req, res) => {
  try {
    const userData = await Usertable.find().sort({ createdAt: -1 });
    // console.log( userData);
    return res.json({ status: true, data: userData });
  } catch (err) {
    console.log("errorrrr", err);
    return res.status(500).json({ status: false, errors: err.errors });
  }
};

module.exports = userslist;
