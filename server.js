"use strict";
exports.__esModule = true;
var express = require("express");
var path = require('path');
var app = express();
var port = 5000;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/projects', function (req, res) {
    res.render('projects');
});
app.get('/api/getAllProjects', function (req, res) {
    var data = [
        {
            img: 'images/money_heist.png',
            link: 'https://dmi-t-d.000webhostapp.com/', name: 'Money heist', id: 0
        },
        {
            img: 'images/selectpad.jpg',
            link: 'https://selectpad.netlify.app/', name: 'Own JavaScript library', id: 1
        },
        {
            img: 'images/tasty_cakes.png',
            link: 'https://cakes-d.netlify.app/', name: 'Tasty cakes', id: 2
        },
        {
            img: 'images/falet.png',
            link: 'https://mern-falet.herokuapp.com/', name: 'Social network', id: 3
        },
    ];
    res.status(200).json({ status: 'success', data: data });
});
app.get('/experience', function (req, res) {
    res.render('experience');
});
app.get('/contacts', function (req, res) {
    res.render('contacts');
});
app.listen(port, function () { return console.log('Server is working'); });
