import { getDistance, arePointsEqual, calculateCodeLines, Direction } from './utils.js';
import esper from 'esper.js';

export class LevelRunner {
  hero = {
    move_up: (steps = 1) => this.hero.move(Direction.UP, steps, 'move_up'),
    move_down: (steps = 1) => this.hero.move(Direction.DOWN, steps, 'move_down'),
    move_right: (steps = 1) => this.hero.move(Direction.RIGHT, steps, 'move_right'),
    move_left: (steps = 1) => this.hero.move(Direction.LEFT, steps, 'move_left'),

    shoot_up: () => this.hero.shoot(Direction.UP, 'shoot_up'),
    shoot_down: () => this.hero.shoot(Direction.DOWN, 'shoot_down'),
    shoot_right: () => this.hero.shoot(Direction.RIGHT, 'shoot_right'),
    shoot_left: () => this.hero.shoot(Direction.LEFT, 'shoot_left'),

    attack: (targetName) => {
      if (!this.level.enemies || this.level.enemies.length === 0) {
        throw new Error('Нет врагов рядом!');
      }
      
      let target = this.level.enemies.find(e => e.name === targetName);
      if (!target) {
        throw new Error(`Нет врага по имени ${targetName}!`);
      }

      if (Math.abs(target.x - this.level.hero.x) > 1 || Math.abs(target.y - this.level.hero.y) > 1) {
        throw new Error(`Враг ${targetName} находится слишком далеко!`)
      }

      target.alive = false;
      this.pushNewCommand(`attack ${targetName}`);
    },

    find_nearest_enemy: () => {
      if (!this.level.enemies || this.level.enemies.length === 0)
        return;

      let sortedAliveEnemies = this.level.enemies
        .filter(e => e.alive)
        .toSorted((a, b) => getDistance(this.level.hero, a) - getDistance(this.level.hero, b));
      
      if (sortedAliveEnemies.length > 0)
        return sortedAliveEnemies[0].name;
    },

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

        if (this.level.walls && this.level.walls.some(wall => arePointsEqual(wall, projectilePoint)))
          break;

        if (this.level.enemies) {
          let hitEnemy = false;
          this.level.enemies.forEach((enemy, i) => {
            if (arePointsEqual(enemy, projectilePoint) && enemy.alive) {
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
      hasFinished: arePointsEqual(this.level.finish, this.level.hero),
      allGemsCollected: !this.level.gems || this.gemsCollected === this.level.gems.length,
      numberOfLinesSatisfy: !this.level.linesGoal || calculateCodeLines(code) <= this.level.linesGoal,
      heroRanInWall: this.heroRanInWall,
      heroRanInEnemy: this.heroRanInEnemy,
      commands: this.commands,
    };
  }

  updateHeroPos(newHeroPosition, commandName) {
    while (!arePointsEqual(newHeroPosition, this.level.hero)) {
      this.pushNewCommand(commandName);

      this.level.hero.x += Math.sign(newHeroPosition.x - this.level.hero.x);
      this.level.hero.y += Math.sign(newHeroPosition.y - this.level.hero.y);

      if (this.level.hero.x >= this.level.height || this.level.hero.y >= this.level.width || this.level.hero.x < 0 || this.level.hero.y < 0) {
        this.heroRanInWall = true;
        return;
      }

      if (this.level.walls && this.level.walls.some(wall => arePointsEqual(wall, this.level.hero))) {
        this.heroRanInWall = true;
        return;
      }

      if (this.level.enemies && this.level.enemies.some(enemy => enemy.alive && arePointsEqual(enemy, this.level.hero))) {
        this.heroRanInEnemy = true;
        return;
      }

      if (this.level.gems) {
        let takenGem = this.level.gems.find(g => arePointsEqual(g, this.level.hero) && !g.taken)
        if (takenGem) {
          takenGem.taken = true;
          this.gemsCollected += 1;
        }
      }
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