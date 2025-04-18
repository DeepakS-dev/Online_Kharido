const express = require("express");
const routerVar = express.Router();
const upload = require("../middlewares/image-uploader");
const createVariant = require("../controllers/productVariant/createProductVariant");
const deleteProductVariant = require("../controllers/productVariant/deleteVariant");
const productvariantlist = require("../controllers/productVariant/productVariantList");
const updateProductVariant = require("../controllers/productVariant/updateProductVariant");
const singleProductVariant = require("../controllers/productVariant/singleProductVariant");

routerVar.get("/", productvariantlist);
routerVar.post(
  "/createVariant",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  createVariant
);
routerVar.patch(
  "/:id",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  updateProductVariant
);
routerVar.get("/single-product/:id", singleProductVariant);

routerVar.delete("/:id", deleteProductVariant);

module.exports = routerVar;
