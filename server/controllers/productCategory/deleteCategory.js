const Category = require("../../Models/category");

const deleteCategory = async (req, res) => {
  try {
    const deletedData = await Category.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};
module.exports = deleteCategory;