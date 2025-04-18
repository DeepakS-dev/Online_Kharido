const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const addToWishlist = require('../controllers/wishList/addToWishList');
const routerWish = express.Router();



routerWish.post('/',authenticateToken,addToWishlist);


module.exports = routerWish;
