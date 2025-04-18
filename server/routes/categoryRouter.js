const express = require("express");
const createCategory = require("../controllers/productCategory/createCategory.js");
const upload = require("../middlewares/image-uploader.js");
const categoryList = require("../controllers/productCategory/categoryList.js");
const mainCategory = require("../controllers/productCategory/mainCategory.js");
const categorysingle = require("../controllers/productCategory/categorySingle.js");
const deleteCategory = require("../controllers/productCategory/deleteCategory.js");
const updateCategory = require("../controllers/productCategory/updateCategory.js");
const frontendCategoryList = require("../controllers/productCategory/frontendCategoryList.js");
const routercate = express.Router();

routercate.post( "/",upload.fields([{ name: "category_image", maxCount: 1 }]),
  createCategory
);

routercate.get("/",categoryList);
routercate.get("/main-category",mainCategory);
routercate.get("/frontendcategorylist",frontendCategoryList);
routercate.get("/:id",categorysingle);
routercate.delete("/:id",deleteCategory);
routercate.patch("/:id",upload.fields([
  { name: 'category_image', maxCount: 1 },
]),updateCategory);
 
module.exports = routercate;
