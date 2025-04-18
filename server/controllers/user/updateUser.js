const Usertable = require("../../Models/usertable");

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userUpdate = await Usertable.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!userUpdate) {
      return res.status(404).json({ 
        status: false, 
        message: "User Not updated." });
    } else {
      return res.status(200).json({ 
        status: true,
        message: "User updated.",
        data: userUpdate });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

module.exports = updateUser;
