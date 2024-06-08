import { levels } from './levels.js';
import { LevelRunner } from './LevelRunner.js';
import { createServer } from 'http';
import esper from 'esper.js';
import express from 'express';
import { cors } from './middlewares.js';

esper.plugin('lang-python');

const port = 9000;
const app = express();
app.use(express.json());
app.use(cors);

app.get('/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(levels[req.params.id]));
})

app.post('/level/:id/run', (req, res) => {
  let runner = new LevelRunner(levels[req.params.id]);
  let result = runner.run(req.body.code);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
})

const server = createServer(app);
server.listen(port, () => console.log(`Server started on ${port}`));