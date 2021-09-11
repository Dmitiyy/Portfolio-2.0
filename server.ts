import * as express from 'express';
import * as dotenv from 'dotenv';
import { getAllProjects, sendMessageToTelegram } from './controllers/apiController';
const path = require('path');

dotenv.config({path: 'config.env'});

const app = express();
const port: number | string = process.env.PORT || 5000;
const apiRouter: express.Router = express.Router();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

app.get('/projects', (req: express.Request, res: express.Response) => {
  res.render('projects');
});

app.get('/experience', (req: express.Request, res: express.Response) => {
  res.render('experience');
});

app.get('/contacts', (req: express.Request, res: express.Response) => {
  res.render('contacts');
});

apiRouter.get('/getAllProjects', getAllProjects);
apiRouter.post('/sendMessage', sendMessageToTelegram);

app.use('/api', apiRouter);

app.listen(port, () => console.log('Server is working'));