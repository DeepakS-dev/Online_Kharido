const Cart = require("../../Models/cart");
const cartList = async (req, res) => {
  try {
    const cartlisting = await Cart
      .find()
      .populate("user_id", "name email mobile")
      .populate(
        "product_variant_id",
        "product_name product_image1 description selling_price mrp_price weight weighttype"
      )
      .populate(
        "product_id",
        "product_name product_image1 description selling_price mrp_price weight weighttype"
      )
      .sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "Successfully fetched",
      data: cartlisting,
    });
  } catch (err) {
    // console.log(`  here is errror ${err}`);
    return res.status(500).json({
      status: false,
      errors: err,
    });
  }
};

module.exports = cartList;
