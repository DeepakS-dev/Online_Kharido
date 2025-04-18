const Variant = require("../../Models/productVariant");
const Category = require("../../Models/category");
const mongoose = require("mongoose");
const singleProductVariant = async (req, res) => {
  try {
    const data = await Variant.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: false,
        error: "product not found",
      });
    }

    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);
    return res.status(200).json({
      status: true,
      message: "Successfully fetched the data",
      data,
      parentcategory,
      childcategory,
      slug: data.product_url.replace(/-/g, " "),
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

const fetchchildcategory = async (categoryarray) => {
  if (categoryarray[0]) {
    try {
      const categoryIds = categoryarray[0].split(",");
      const objectIdArray = categoryIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const categories = await Category.find({ _id: { $in: objectIdArray } });
      return categories;
    } catch (error) {
      console.log(error);
    }
  } else {
    return [];
  }
};

module.exports = singleProductVariant;
