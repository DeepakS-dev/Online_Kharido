const Cart = require("../../Models/cart");
const removeFromCart = async (req, res) => {
  const { cart_id } = req.params;
  try {
    // Use Mongoose to find and remove the cart item by its ID
    const deletedCartItem = await Cart.findByIdAndRemove(cart_id);

    if (!deletedCartItem) {
      return res.status(404).json({
        status: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error,
    });
  }
};

module.exports = removeFromCart;
