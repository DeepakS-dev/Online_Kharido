const Variant = require("../../Models/productVariant");
const productvariantlist = async (req, res) => {
  try {
    const productListing = await Variant.find({ product_id: req.params.id });
    return res.status(200).json({
      status: true,
      data: productListing,
    });
  } catch (err) {
    // console.log(`  here is errror ${err}`);
    return res.status(500).json({
      status: false,
      errors: err,
    });
  }
};

module.exports = productvariantlist;
