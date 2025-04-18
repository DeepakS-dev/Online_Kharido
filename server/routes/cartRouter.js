const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const addToCart = require('../controllers/cart/addToCart');
const checkuser = require('../middlewares/checkUser');
const cartCount = require('../controllers/cart/frontend/cartCount');
const removeFromCart = require('../controllers/cart/removeFromCart');
const updateCartQuantity = require('../controllers/cart/frontend/updateCartQuantity');
const cartList = require('../controllers/cart/cartList');
const addToCartList = require('../controllers/cart/addToCartList');

const routerCart = express.Router();

routerCart.post('/',authenticateToken,addToCart);
routerCart.get('/cartcount',checkuser,cartCount);
routerCart.get('/',cartList);
routerCart.get('/addtocartlist',checkuser,addToCartList);
routerCart.post('/updateQuantity',authenticateToken,updateCartQuantity);
routerCart.delete('/:cart_id',removeFromCart);



module.exports = routerCart;