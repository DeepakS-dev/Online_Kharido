const user = require("../../../Models/usertable.js");

const frontendSingleUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const userDetails = await user
      .findById(userId)
      .select("-password -status -isAdmin");
    if (!userDetails) {
      return res.status(404).json({
        status: false,
        message: "User details not found.",
      });
    }
    res.status(200).json({
      status: true,
      message: "Successfully fetched UserDetails.",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

module.exports = frontendSingleUser;
