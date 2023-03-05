const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');

//Routes
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const brandRouter = require('./routes/brandRouter');
const userRouter = require('./routes/userRouter');

app.use(cors());
app.use(cookieParser());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/uploads/brands/:path', (req, res) => {
    const img = __dirname + '/uploads/brands/' + req.params.path
    fs.readFile(img, (err, data) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            res.end(data)
        }
    })
});

app.get('/uploads/categories/:path', (req, res) => {
    const img = __dirname + '/uploads/categories/' + req.params.path
    fs.readFile(img, (err, data) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            res.end(data)
        }
    })
});

app.get('/uploads/products/:path', (req, res) => {
    const img = __dirname + '/uploads/products/' + req.params.path
    fs.readFile(img, (err, data) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            res.end(data)
        }
    })
});


// Routes
app.use('/category', categoryRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// Undefined routes

app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'route not found' });
});


module.exports = app;

