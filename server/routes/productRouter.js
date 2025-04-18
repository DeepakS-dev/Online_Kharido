const express = require('express');
const productList = require('../controllers/Products/productList');
const createProduct = require('../controllers/Products/createProduct');
const upload = require('../middlewares/image-uploader');
const singleProduct = require('../controllers/Products/singleProduct');
const deleteProduct = require('../controllers/Products/deleteProduct');
const updateProduct = require('../controllers/Products/updateProduct');
const productByCategory = require('../controllers/Products/frontend/product_by_category');
const productSearch = require('../controllers/Products/frontend/frontend_search');
const frontendSingleProduct = require('../controllers/Products/frontend/frontendSingleProduct');
const checkuser = require('../middlewares/checkUser');
const routerpro = express.Router();

routerpro.get('/',productList);
routerpro.post('/createproduct',upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
  ]),createProduct);
  routerpro.patch('/:id',upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
  ]),updateProduct);
  routerpro.get('/product-by-category/:id',productByCategory);
  routerpro.get('/:id',singleProduct);
  routerpro.get('/search/:name',productSearch);
  routerpro.get('/product-detail/:id',checkuser,frontendSingleProduct)
  routerpro.delete('/:id',deleteProduct);

module.exports = routerpro;