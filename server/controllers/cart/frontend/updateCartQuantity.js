const Cart = require("../../../Models/cart");

const updateCartQuantity = async (req, res) => {
  try {
    const { cartItemId, newQuantity } = req.body;
    const user_id = req.user.id;

    const existingCartItem = await Cart.findOne({
      _id: cartItemId,
      user_id,
    });

    if (existingCartItem) {
      existingCartItem.product_qty = newQuantity;
      await existingCartItem.save();
      return res.status(200).json({
        status: true,
        message: "Successfully updated",
        data: existingCartItem,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Cart item not found",
        
      });
    }
  } catch (err) {
    // console.log(`Here is error: ${err}`);
    return res.status(500).json({
      status: false,
      errors: err.message,
    });
  }
};

module.exports = updateCartQuantity;
