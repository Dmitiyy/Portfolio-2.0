import * as express from 'express';
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
const Promise = require('bluebird');

dotenv.config({path: 'config.env'});

process.on("unhandledRejection", (e) => { throw e });

Promise.config({cancellation: true});

type TProject = {
  img: string;
  link: string;
  name: string;
  id: number;
}

const bot = new Telegraf(process.env.BOT_TOKEN);

export const getAllProjects = (req: express.Request, res: express.Response) => {
  const data: Array<TProject> = [
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

  res.status(200).json({status: 'success', data});
}

export const sendMessageToTelegram = (req: express.Request, res: express.Response) => {
  try {
    const {name, email, message} = req.body;

    const sendedMessage: string = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    bot.telegram.sendMessage(891286462, sendedMessage);

    res.status(200).json({status: 'success'});
  } catch (err) {console.log(err);res.status(500).json({status: 'fail', err})}
}

bot.launch();