const Category = require("../../Models/category");
const slugify = require("slugify");
const updateCategory = async (req, res) => {
  try {
    const {
      category_name,
      category_url,
      editor,
      meta_description,
      meta_title,
      meta_keywords,
      parent_category,
      status,
    } = req.body;
    let categoryobj = {};
    if (req.files.category_image) {
      categoryobj = {
        name: category_name,
        url: slugify(category_url),
        desc: editor,
        metatitle: meta_title,
        metadesc: meta_description,
        meta_keywords: meta_keywords,
        status: status,
        parentcategory: parent_category == "" ? [] : parent_category,
        banner: req.files.category_image[0].filename,
      };
    } else {
      categoryobj = {
        name: category_name,
        url: slugify(category_url),
        desc: editor,
        metatitle: meta_title,
        metadesc: meta_description,
        meta_keywords: meta_keywords,
        status: status,
        parentcategory: parent_category == "" ? [] : parent_category,
      };
    }
    const updatedcategory = await Category.findByIdAndUpdate(
      req.params.id,
      categoryobj,
      { new: true }
    );

    if (!updatedcategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.json({
      status: true,
      data: updatedcategory,
    });
  } catch (err) {
    console.log(`here is errror ${err}`);
    res.json({
      status: false,
      errors: err,
    });
  }
};

module.exports = updateCategory;
