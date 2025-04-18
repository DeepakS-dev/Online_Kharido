const Category = require("../../Models/category");
const mongoose = require("mongoose");
const categorysingle = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
      return res.status(404).json({
        status: false,
        error: "categories not found",
      });
    }
    let childcategory = await fetchchildcategory(categories.parentcategory);

    res.send({
      status: true,
      message: "Category fetched successfully",
      data: categories,
      parent: childcategory,
      slug: categories.url.replace(/-/g, " "),
    });
  } catch (err) {
    res.status(500).json({
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
    } catch (error) {}
  } else {
    return [];
  }
};

module.exports = categorysingle;
