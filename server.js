"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var apiController_1 = require("./controllers/apiController");
var path = require('path');
dotenv.config({ path: 'config.env' });
var app = express();
var port = process.env.PORT || 5000;
var apiRouter = express.Router();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/projects', function (req, res) {
    res.render('projects');
});
app.get('/experience', function (req, res) {
    res.render('experience');
});
app.get('/contacts', function (req, res) {
    res.render('contacts');
});
apiRouter.get('/getAllProjects', apiController_1.getAllProjects);
apiRouter.post('/sendMessage', apiController_1.sendMessageToTelegram);
app.use('/api', apiRouter);
app.listen(port, function () { return console.log('Server is working'); });
