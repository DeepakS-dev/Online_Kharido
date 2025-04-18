const Product = require("../../Models/product");
const slugify = require("slugify");
const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_url,
      meta_title,
      meta_keywords,
      meta_description,
      featuredproduct,
      trendingproduct,
      newarrivedproduct,
      editor,
      parent_category,
      child_category,
      sort_description,
      weight_type,
      weight,
      stock,
      mrp_price,
      selling_price,
      status,
      color,
      brand,
      size,
    } = req.body;

    const insertproduct = new Product({
      product_name,
      sort_description,
      product_url: slugify(product_url),
      product_image1: req.files.product_image1[0].filename,
      product_image2: req.files.product_image2[0].filename,
      product_image3: req.files.product_image3[0].filename,
      product_image4: req.files.product_image4[0].filename,
      description: editor,
      // dynamicAttributes:JSON.parse(attribute),
      size,
      color,
      brand,
      meta_title,
      newarrivedproduct,
      trendingproduct,
      featuredproduct,
      parent_category,
      child_category,
      meta_keywords,
      meta_description,
      weight_type,
      selling_price,
      mrp_price,
      stock,
      status,
      weight,
    });

    const response = await insertproduct.save();
    return res.status(200).json({
      status: true,
      message: "Product Created Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

module.exports = createProduct;
