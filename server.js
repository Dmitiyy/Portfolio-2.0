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
app.listen(port, function () { return console.log('Server is working'); });
