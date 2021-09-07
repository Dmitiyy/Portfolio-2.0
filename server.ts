import * as express from 'express';
const path = require('path');

const app = express();
const port: number = 5000;

type TProject = {
  img: string;
  link: string;
  name: string;
  id: number
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

app.get('/projects', (req: express.Request, res: express.Response) => {
  res.render('projects');
});

app.get('/api/getAllProjects', (req: express.Request, res: express.Response) => {
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
});

app.get('/experience', (req: express.Request, res: express.Response) => {
  res.render('experience');
});

app.get('/contacts', (req: express.Request, res: express.Response) => {
  res.render('contacts');
});

app.listen(port, () => console.log('Server is working'));