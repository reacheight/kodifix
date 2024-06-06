const utils = require('./utils.js');
const Direction = utils.Direction;
const esper = require('esper.js');

class LevelRunner {
  hero = {
    move_up: (steps = 1) => this.hero.move(Direction.UP, steps, 'move_up'),
    move_down: (steps = 1) => this.hero.move(Direction.DOWN, steps, 'move_down'),
    move_right: (steps = 1) => this.hero.move(Direction.RIGHT, steps, 'move_right'),
    move_left: (steps = 1) => this.hero.move(Direction.LEFT, steps, 'move_left'),

    shoot_up: () => this.hero.shoot(Direction.UP, 'shoot_up'),
    shoot_down: () => this.hero.shoot(Direction.DOWN, 'shoot_down'),
    shoot_right: () => this.hero.shoot(Direction.RIGHT, 'shoot_right'),
    shoot_left: () => this.hero.shoot(Direction.LEFT, 'shoot_left'),

    move: (direction, steps, methodName) => {
      let newHeroPos = structuredClone(this.level.hero);
      newHeroPos.x += direction.x * steps;
      newHeroPos.y += direction.y * steps;
      this.updateHeroPos(newHeroPos, methodName);
    },

    shoot: (direction, commandName) => {
      this.pushNewCommand(commandName);

      const shootingRange = 3;
      for (let i = 1; i < shootingRange + 1; i++) {
        const projectilePoint = structuredClone(this.level.hero);
        projectilePoint.x += direction.x * i;
        projectilePoint.y += direction.y * i;

        if (projectilePoint.x >= this.level.height || projectilePoint.x < 0 || projectilePoint.y >= this.level.width || projectilePoint.y < 0)
          break;

        if (this.level.walls && this.level.walls.some(wall => utils.arePointsEqual(wall, projectilePoint)))
          break;

        if (this.level.enemies) {
          let hitEnemy = false;
          this.level.enemies.forEach((enemy, i) => {
            if (utils.arePointsEqual(enemy, projectilePoint) && enemy.alive) {
              this.level.enemies[i].alive = false;
              hitEnemy = true;
              return;
            }
          });

          if (hitEnemy)
            break;
        }
      }
    }
  };

  gemsCollected = 0;
  heroRanInWall = false;
  heroRanInEnemy = false;

  commands = [];
  
  constructor(level) {
    this.level = structuredClone(level);
    this.engine = esper({
      language: 'python'
    });

    this.engine.addGlobal('hero', this.hero);
  }

  run(code) {
    this.engine.load(code);

    let steps = 0;
    let value = this.engine.evloop.next();
    while (!value.done && !this.heroRanInWall && !this.heroRanInEnemy) {
      value = this.engine.evloop.next();
      if ( value.value && value.value.then ) throw new Error('Can\'t deal with futures when running in sync mode');
      if ( ++steps > this.engine.options.executionLimit ) throw new Error('Execution Limit Reached');
    }

    return {
      hasFinished: utils.arePointsEqual(this.level.finish, this.level.hero),
      allGemsCollected: !this.level.gems || this.gemsCollected === this.level.gems.length,
      numberOfLinesSatisfy: !this.level.linesGoal || utils.calculateCodeLines(code) <= this.level.linesGoal,
      heroRanInWall: this.heroRanInWall,
      heroRanInEnemy: this.heroRanInEnemy,
      commands: this.commands,
    };
  }

  updateHeroPos(newHeroPosition, commandName) {
    while (!utils.arePointsEqual(newHeroPosition, this.level.hero)) {
      this.pushNewCommand(commandName);

      this.level.hero.x += Math.sign(newHeroPosition.x - this.level.hero.x);
      this.level.hero.y += Math.sign(newHeroPosition.y - this.level.hero.y);

      if (this.level.hero.x >= this.level.height || this.level.hero.y >= this.level.width || this.level.hero.x < 0 || this.level.hero.y < 0) {
        this.heroRanInWall = true;
        return;
      }

      if (this.level.walls && this.level.walls.some(wall => utils.arePointsEqual(wall, this.level.hero))) {
        this.heroRanInWall = true;
        return;
      }

      if (this.level.enemies && this.level.enemies.some(enemy => enemy.alive && utils.arePointsEqual(enemy, this.level.hero))) {
        this.heroRanInEnemy = true;
        return;
      }

      if (this.level.gems)
        this.level.gems.forEach((gem, i) => {
          if (utils.arePointsEqual(gem, this.level.hero) && !gem.taken) {
            this.level.gems[i].taken = true;
            this.gemsCollected += 1;
          }
        });
    }
  }

  pushNewCommand(commandName) {
    let callExpression = this.engine.evaluator.lastASTNodeProcessed.parent.parent;
    let start = callExpression.loc.start;
    let end = callExpression.loc.end;
    let command = {
      name: commandName,
      start: { line: start.line, column: start.column },
      end: { line: end.line, column: end.column }
    };
    this.commands.push(command);
  }
}

module.exports.LevelRunner = LevelRunner;