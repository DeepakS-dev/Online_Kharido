const Usertable = require("../../../Models/usertable.js");

const frontendUpdateUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const userUpdatedDetails = await Usertable.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!userUpdatedDetails) {
      return res.status(404).json({
        status: false,
        message: "User Details Not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "User's details updated successfully",
      data: userUpdatedDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

module.exports = frontendUpdateUser;
