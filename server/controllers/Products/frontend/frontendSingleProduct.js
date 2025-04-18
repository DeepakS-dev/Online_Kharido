const Product = require("../../../Models/product");
const Category = require("../../../Models/category");
const Variant = require("../../../Models/productVariant");
const Wishlist = require("../../../Models/wishlist");
const mongoose = require("mongoose");

const frontendSingleProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ 
        status:false,
        error: "Product not found" });
    }

    const user_id = req.user.id || 0;

    let wishlist_status = false;

    if (user_id) {
      const productWishlistEntry = await Wishlist.findOne({
        user_id,
        product_id: req.params.id,
      });
      wishlist_status = productWishlistEntry ? true : false;
    }

    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);
    const productvariant = await Variant.find({ product_id: req.params.id });
    const variantIds = productvariant.map((v) => v._id);
    const variantWishlistEntries = await Wishlist.find(user_id == 0 ? {
      product_variant_id: { $in: [] },
    } : {
      user_id,
      product_variant_id: { $in: variantIds },
    });
    const variantWishlistMap = new Map(variantWishlistEntries.map((entry) => [entry.product_variant_id.toString(), true]));
    let combinedDynamicAttributes = [];
    const variantsWithWishlistStatus = productvariant.map((variant) => {
      const dynamicAttributesVariant = variant.dynamicAttributes || [];
      combinedDynamicAttributes = [...data.dynamicAttributes, ...dynamicAttributesVariant];
      const variantWishlistStatus = variantWishlistMap.has(variant._id.toString());
      return {
        ...variant._doc,
        dynamicAttributes: combinedDynamicAttributes,
        wishlist_status: variantWishlistStatus,
      };
    });

    // Filter out duplicate attributes based on their keys
    const uniqueAttributes = Array.from(
      new Map(combinedDynamicAttributes.map((attr) => [JSON.stringify(attr), attr])).values()
    );

    return res.status(200).json({
      status: true,
      message:"Success",
      data: { ...data._doc, wishlist_status },
      parentcategory,
      childcategory,
      productvariant: variantsWithWishlistStatus,
      uniqueAttributes,
      slug: data.product_url.replace(/-/g, " "),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
        status:false,
        error: "An error occurred while fetching data" });
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
      console.error(error);
      throw error;
    }
  } else {
    return [];
  }
};

module.exports = frontendSingleProduct;