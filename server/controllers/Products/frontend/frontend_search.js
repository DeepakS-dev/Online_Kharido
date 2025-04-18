const Product = require("../../../Models/product");
const ProductVariant = require("../../../Models/productVariant");

const productSearch = async (req, res) => {
  try {
    const SearchTerm = req.params.name;

    const productResult = await Product.find({
      $or: [{ product_name: { $regex: SearchTerm, $options: "i" } }],
    });

    const productVariantResult = await ProductVariant.find({
      $or: [{ product_variant_name: { $regex: SearchTerm, $options: "i" } }],
    });

    const combinedResult = [...productResult, ...productVariantResult];

    return res.status(200).json({
      status: true,
      message: "Searched result",
      data: combinedResult,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

module.exports = productSearch;
