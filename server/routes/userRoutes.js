const express = require("express");
const router = express.Router();
const userslist = require('../controllers/user/userlist.js');
const register = require("../controllers/user/register.js");
const login = require("../controllers/user/login.js");
const singleUser = require("../controllers/user/singleUser.js");
const updateUser = require("../controllers/user/updateUser.js");
const authenticateToken = require("../middlewares/authenticateToken.js");
const deleteUser = require("../controllers/user/deleteUser.js");
const frontendSingleUser = require("../controllers/user/frontend/frontend_usersingle.js");
const frontendUpdateUser = require("../controllers/user/frontend/frontend_updateuser.js");


router.get('/',userslist);
router.get('/userInfo',authenticateToken,frontendSingleUser);
router.get('/:id',singleUser);
router.delete('/delete/:id',deleteUser);
router.post('/register',register);
router.post('/login',login);
router.patch('/updateuser',authenticateToken,frontendUpdateUser)
router.patch('/:id',authenticateToken,updateUser);


module.exports = router;