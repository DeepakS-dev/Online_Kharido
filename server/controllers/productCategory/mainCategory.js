const Category = require("../../Models/category");

const mainCategory = async (req, res) => {
  try {
    const categories = await Category.find({ parentcategory: [] }).sort({createdAt: -1});

    return res.status(200).json({
      status: true,
      message: "Main Categories list",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

module.exports = mainCategory;
