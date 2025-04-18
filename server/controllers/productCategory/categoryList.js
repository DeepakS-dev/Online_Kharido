const Category = require("../../Models/category.js");

const categoryList = async (req, res) => {
  try {
    const categories =await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "Category List fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

module.exports = categoryList;
