const Cart = require("../../../Models/cart");
const cartCount = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userCart = await Cart.find({ user_id, orderstatus: "add to cart" });
    if (!userCart) {
      return res.status(404).json({
        staus: false,
        message: "User cart is Empty",
      });
    }
    let totalItems = 0;
    userCart.forEach((cartItem) => {
      totalItems += cartItem.product_qty;
    });

    return res.status(200).json({
      status: true,
      totalItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

module.exports = cartCount;
