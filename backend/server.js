import { levels } from './levels.js';
import { instructions } from './instructions.js';
import LevelRunner from './LevelRunner.js';
import { createServer } from 'http';
import esper from 'esper.js';
import express from 'express';
import { cors } from './middlewares.js';
import CodeAnalyzer from './CodeAnalyzer.js';
import { games } from './games.js';
import { startingCode } from './startingCode.js';
import cookieParser from 'cookie-parser';
import UserManager from './UserManager.js';
import Database from './db.js';

esper.plugin('lang-python');

const port = process.env.KODIFIX_PORT ?? 9000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.get('/games/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(games[req.params.id]));
})

app.get('/:game/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(levels[req.params.game][req.params.id]));
})

app.get('/:game/level/:id/instructions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(instructions[req.params.game][req.params.id]));
})

app.get('/:game/level/:id/startingCode', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(startingCode[req.params.game][req.params.id]));
})

app.post('/:game/level/:id/run', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const level = levels[req.params.game][req.params.id];
  const analyzer = new CodeAnalyzer();
  const errors = analyzer.analyze(req.body.code, level.onlyVariablesInAttack);
  if (errors.length > 0) {
    res.statusCode = 400;
    res.send(JSON.stringify({ errors }));
    return;
  }

  let runner = new LevelRunner(level);
  let result = runner.run(req.body.code);

  if (result.errors) {
    res.statusCode = 400;
    res.send(JSON.stringify(result));
    return;
  }

  res.send(JSON.stringify(result));
})

app.get('/user', async (req, res) => {
  if (!req.cookies.yaToken) {
    res.sendStatus(401);
    return;
  }

  const userManager = new UserManager();
  const user = await userManager.getUser(req.cookies.yaToken);
  if (user) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(user));
    return;
  }

  res.sendStatus(401);
})

app.post('/:game/level/:levelId/complete', async (req, res) => {
  if (!req.cookies.yaToken) {
    res.sendStatus(401);
    return;
  }

  const userManager = new UserManager();
  const user = await userManager.getUser(req.cookies.yaToken);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const levelId = req.params.levelId;
  const levelScore = req.body.score;

  const db = new Database();

  const existingUserLevel = await db.getUserLevel(user.id, levelId);
  if (existingUserLevel) {
    if (levelScore > existingUserLevel.stars)
      await db.updateUserLevel(user.id, levelId, levelScore);

    res.sendStatus(200);
    return;
  }
  
  await db.addUserLevel(user.id, levelId, levelScore);
})

app.get('/user/:game/levels', async (req, res) => {
  if (!req.cookies.yaToken) {
    res.sendStatus(401);
    return;
  }

  const userManager = new UserManager();
  const user = await userManager.getUser(req.cookies.yaToken);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const db = new Database();
  const allUserLevels = await db.getAllUserLevels(user.id);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(allUserLevels));
})

const server = createServer(app);
server.listen(port, () => console.log(`Server started on ${port}`));