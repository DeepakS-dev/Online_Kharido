const Category = require('../../Models/category');

const frontendCategoryList = async (req, res) => {
  try {
    const categories = await Category.find({ status: 'Active' });
    const mainCategories = [];
    const categoriesMap = new Map();

    // Initialize map with all categories
    categories.forEach((cat) => {
      categoriesMap.set(cat._id.toString(), { ...cat._doc, subcategories: [] });
    });

    // Identify main categories and map subcategories
    categories.forEach((cat) => {
      if (!cat.parentcategory || cat.parentcategory.length === 0) {
        mainCategories.push(categoriesMap.get(cat._id.toString()));
      } else {
        // Fix parentcategory format by removing brackets
        const parentCategoryId = cat.parentcategory[0].replace(/[\[\]']+/g, '');
        const parentCategory = categoriesMap.get(parentCategoryId);
        
        if (parentCategory) {
          parentCategory.subcategories.push(categoriesMap.get(cat._id.toString()));
        }
      }
    });

    return res.status(200).json({ 
      status: true,
      data: mainCategories 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message 
    });
  }
};

module.exports = frontendCategoryList;
