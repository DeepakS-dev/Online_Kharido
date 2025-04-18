const Order = require("../../Models/order");
const orderList = async (req, res) => {
  try {
    const orderlisting = await Order
      .find()
      .populate("user_id", "first_name last_name email mobile")
      .sort({ createdAt: -1 });
    return res.status(200).json({ status: "sucessfully", data: orderlisting });
  } catch (err) {
    // console.log(`  here is errror ${err}`);
    return res.status(500).json({ status: "faild", errors: err });
  }
};

module.exports = orderList;
