const { validationResult } = require("express-validator");
const fs = require('fs');
const bcrypt = require('bcrypt');

const { readProducts, readProduct } = require("../middleware/products")

let dbUsers = fs.readFileSync('src/database/dbUsers.json', 'utf-8')
let users = JSON.parse(dbUsers)

const home = (req, res) => {
    var username = "";

    if (req.cookies.userData != undefined)
        username = req.cookies.userData.username;

    res.render('home.ejs', {
        username
    });


};

const login = (req, res) => {
    res.render('login.ejs')
};

const processLogin = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    req.session.username = req.body.username

    console.log(req.session.username)
    const { username, password } = req.body
    res.cookie('userData', { username, password }, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
    });
    console.log(req.sessionID)
    console.log(req.cookies['connect.sid'])
    console.log(req.cookies.userData)

    return res.redirect('/home')

};

const register = (req, res) => {
    res.render('register.ejs')
};

const processRegister = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json(errors)

    }

    const { userName, email, password } = req.body
    const passwordHashed = bcrypt.hashSync(password, 10)

    let newUser = {
        userName,
        email,
        password: passwordHashed
    }

    users.push(newUser)

    let userDb = JSON.stringify(users)
    fs.writeFileSync('src/database/dbUsers.json', userDb, 'utf-8')


    res.redirect('/login')
};

const shop = (req, res) => {
    var username = "";

    if (req.cookies.userData != undefined)
        username = req.cookies.userData.username;

    const products = readProducts();

    if (products.length <= 0) {
        return res.status(404).json({
            status: 'error',
            message: 'no se encontraron productos'
        });
    }

    res.render('shop.ejs', {
        username,
        products
    });
};

const productDetail = (req, res) => {
    var username = "";

    if (req.cookies.userData != undefined)
        username = req.cookies.userData.username;

    const id = +req.params.id;
    console.log(id);
    const products = readProduct(id);
    console.log(products.length)

    return res.render('productDetail', {
        username,
        products
    });

};

const cart = (req, res) => {
    var username = "";

    if (req.cookies.userData != undefined)
        username = req.cookies.userData.username;

    return res.render('cart', {
        username
    });
};


const logout = (req, res) => {
    console.log(req.cookies.userData)
    res.clearCookie("userData");
    return res.redirect('login');
}

module.exports = {
    home,
    login,
    processLogin,
    register,
    processRegister,
    shop,
    cart,
    productDetail,
    logout
};