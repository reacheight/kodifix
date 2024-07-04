import { levels } from './levels.js';
import { instructions } from './instructions.js';
import LevelRunner from './LevelRunner.js';
import { createServer } from 'http';
import esper from 'esper.js';
import express from 'express';
import { cors } from './middlewares.js';
import CodeAnalyzer from './CodeAnalyzer.js';

esper.plugin('lang-python');

const port = 9000;
const app = express();
app.use(express.json());
app.use(cors);

app.get('/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(levels[req.params.id]));
})

app.get('/level/:id/instructions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(instructions[req.params.id]));
})

app.post('/level/:id/run', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const analyzer = new CodeAnalyzer();
  const errors = analyzer.analyze(req.body.code);
  if (errors.length > 0) {
    res.statusCode = 400; // стоит ли возвращать 400?
    res.send(JSON.stringify({ errors }));
    return;
  }

  let runner = new LevelRunner(levels[req.params.id]);
  let result = runner.run(req.body.code);

  if (result.errors) {
    res.statusCode = 400;
    res.send(JSON.stringify(result));
    return;
  }

  res.send(JSON.stringify(result));
})

const server = createServer(app);
server.listen(port, () => console.log(`Server started on ${port}`));