const Usertable = require("../../Models/usertable.js");
const singleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userDetails = await Usertable.findById(userId);
    if (!userDetails) {
      return res
        .status(404)
        .json({ status: false, message: "User found with id " });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Exist",
        data: userDetails,
      });
    }

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "not able to find user.",
    });
  }
};

module.exports = singleUser;
