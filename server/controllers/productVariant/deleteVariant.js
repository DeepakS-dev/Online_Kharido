const Variant = require("../../Models/productVariant");
const deleteProductVariant = async (req, res) => {
  try {
    const ProductVariant = await Variant.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: true,
      message:"Deleted Successfully",
      data: ProductVariant,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

module.exports = deleteProductVariant;
