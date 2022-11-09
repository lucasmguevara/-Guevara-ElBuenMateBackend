const restrict = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        req.session.error = 'Acceso denegado'
        res.redirect('/login')
    }
}

module.exports = { restrict }