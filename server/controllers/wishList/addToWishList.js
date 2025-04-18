const Wishlist = require("../../Models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { product_name, product_id, product_variant_id, item_or_variant } =
      req.body;
    const user_id = req.user.id;
    const addProduct = new Wishlist({
      product_name,
      product_id,
      user_id,
      product_variant_id,
      item_or_variant,
    });

    const response = await addProduct.save();
    return res.status(200).json({
      status: true,
      message: "Added to wish list",
      data: response,
    });
  } catch (err) {
    // console.log(`Here is error: ${err}`);
    return res.status(500).json({
      status: false,
      errors: err,
    });
  }
};

module.exports = addToWishlist;
