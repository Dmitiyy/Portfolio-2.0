"use strict";
exports.__esModule = true;
exports.sendMessageToTelegram = exports.getAllProjects = void 0;
var telegraf_1 = require("telegraf");
var dotenv = require("dotenv");
var Promise = require('bluebird');
dotenv.config({ path: 'config.env' });
process.on("unhandledRejection", function (e) { throw e; });
Promise.config({ cancellation: true });
var bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
var getAllProjects = function (req, res) {
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
};
exports.getAllProjects = getAllProjects;
var sendMessageToTelegram = function (req, res) {
    try {
        var _a = req.body, name_1 = _a.name, email = _a.email, message = _a.message;
        var sendedMessage = "Name: " + name_1 + "\nEmail: " + email + "\nMessage: " + message;
        bot.telegram.sendMessage(891286462, sendedMessage);
        res.status(200).json({ status: 'success' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', err: err });
    }
};
exports.sendMessageToTelegram = sendMessageToTelegram;
bot.launch();
