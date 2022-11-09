const fs = require('fs');
const products = require('../database/dbProducts.json');


const detailValidation = (req, res, next) => {
    const id = +req.params.id
    let product = products.filter(p => p.id === id)
    if (product.length == 0) {
        return res.status(404).render("notFound")
    }

    next();
}

module.exports = { detailValidation }