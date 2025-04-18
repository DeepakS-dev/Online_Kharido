const Product = require("../../Models/product");
const slugify = require("slugify");
const updateProduct = async (req, res) => {
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

    const data = {
      product_name,
      sort_description,
      product_url: slugify(product_url),
      description: editor,
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
      size,
      color,
      brand,
      // dynamicAttributes:JSON.parse(attribute),
    };

    for (let i = 1; i <= 4; i++) {
      const imageFieldName = `product_image${i}`;
      if (req.files[imageFieldName]) {
        data[imageFieldName] = req.files[imageFieldName][0].filename;
        console.log(req.files[imageFieldName][0].filename);
      }
    }
    const updateproduct = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updateproduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: updateproduct,
    });
  } catch (err) {
    console.log(`  here is errror ${err}`);

    return res.status(500).json({
      status: false,
      errors: err,
    });
  }
};

module.exports = updateProduct;
