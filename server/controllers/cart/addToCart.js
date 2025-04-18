const Cart = require("../../Models/cart");

const addToCart = async (req, res) => {
  try {
    const {
      product_name,
      product_id,
      product_qty,
      product_variant_id,
      item_or_variant,
    } = req.body;
    const user_id = req.user.id;
    const existingCartItem = await Cart.findOne({
      product_id,
      user_id,
      product_variant_id,
      item_or_variant,
      orderstatus: "add to cart"
    });

    if (existingCartItem) {
      existingCartItem.product_qty += product_qty;
      await existingCartItem.save();
     return res.status(200).json({ 
        status: true,
        message:"added successfully", 
        data: existingCartItem });
    } else {
      const addproduct = new Cart({
        product_name,
        product_id,
        product_qty,
        user_id,
        product_variant_id,
        item_or_variant,
      });

      const response = await addproduct.save();
     return res.status(200).json({ 
        status: true,
        message:"added successfully", 
        data: response });
    }
  } catch (err) {
    // console.log(`Here is error: ${err}`);
    return res.status(500).json({ 
        status: false,
         errors: err });
  }
};

module.exports = addToCart;