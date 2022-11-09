const express = require('express');
const router = express.Router();
const {
    home,
    login,
    processLogin,
    register,
    processRegister,
    shop,
    cart,
    productDetail,
    logout
} = require('../controllers/controllers');
const loginValidator = require('../middleware/login');
const registerValidator = require('../middleware/register');
const { productDetailValidation } = require('../middleware/productDetail');
const { readProducts, readProduct } = require('../middleware/products');
const { restrict } = require('../middleware/restrict');

router.get('/', home);

router.get('/home', home);

router.get('/login', login);

router.post('/login', loginValidator, processLogin);

router.get('/register', register);

// router.post('/register', registerValidator, processRegister);

router.get('/shop', shop);

router.get('/productDetail/:id', productDetail);

router.get('/cart', cart);

router.get('/logout', logout);

module.exports = router;