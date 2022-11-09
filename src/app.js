const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
require('dotenv').config()
const bodyParser = require('body-parser');
const sessionTime = 1000 * 60 * 15
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(session({
    secret: '1a2b3c4d',
    cookie: {
        maxAge: sessionTime,
        httpOnly: true,
    },
    saveUninitialized: true,
    resave: true
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(require('./routes/routes'));
app.use(express.static('src/public'));

app.use((req, res, next) => {
    res.status(404).render("notFound")
});

app.listen(process.env.PORT, () => console.log(`SERVIDOR INICIADO EN PUERTO ${process.env.PORT}`));