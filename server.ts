import * as express from 'express';
const path = require('path');

const app = express();
const port: number = 5000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

app.get('/projects', (req: express.Request, res: express.Response) => {
  res.render('projects');
});

app.listen(port, () => console.log('Server is working'));