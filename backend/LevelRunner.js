import ErrorMessageMapper from './ErrorMessageMapper.js';
import GameplayErrorTypes from './GameplayErrorTypes.js';
import { getDistance, arePointsEqual, calculateCodeLines, Direction } from './utils.js';
import esper from 'esper.js';

export default class LevelRunner {
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
      if (!this.level.enemies || this.level.enemies.filter(e => e.alive).length === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_ENEMIES_TO_ATTACK };
        return;
      }
      
      let target = this.level.enemies.filter(e => e.alive).find(e => e.name === targetName);
      if (!target) {
        this.gameplayError = { type: GameplayErrorTypes.NO_ENEMY_WITH_GIVEN_NAME, name: targetName };
        return;
      }

      if (Math.abs(target.x - this.level.hero.x) > 1 || Math.abs(target.y - this.level.hero.y) > 1) {
        this.gameplayError = { type: GameplayErrorTypes.ENEMY_TOO_FAR, name: target.hidden ? "Имя скрыто" : targetName };
        return;
      }

      target.alive = false;
      this.pushNewCommand(`attack`, { target: targetName });
    },

    switch: (leverName) => {
      if (!this.level.levers || this.level.levers.length === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVERS };
        return;
      }

      const lever = this.level.levers.find(l => l.name === leverName);
      if (!lever) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME, name: leverName };
        return;
      }

      if (Math.abs(lever.x - this.level.hero.x) > 1 || Math.abs(lever.y - this.level.hero.y) > 1) {
        this.gameplayError = { type: GameplayErrorTypes.LEVER_TOO_FAR, name: leverName };
        return;
      }

      lever.enabled = !lever.enabled;
      const bridge = this.level.bridges.find(bridge => bridge.id === lever.activatesId);
      bridge.activated = lever.enabled;

      this.pushNewCommand("switch", { activatableId: lever.activatesId });
    },

    find_nearest_enemy: () => {
      if (!this.level.enemies || this.level.enemies.length === 0)
      {
        this.pushNewCommand("find_nearest_enemy", { hasEnemy: false });
        return;
      }

      let sortedAliveEnemies = this.level.enemies
        .filter(e => e.alive)
        .toSorted((a, b) => getDistance(this.level.hero, a) - getDistance(this.level.hero, b));
      
      if (sortedAliveEnemies.length > 0) {
        this.pushNewCommand("find_nearest_enemy", { hasEnemy: true });
        return sortedAliveEnemies[0].name;
      }

      this.pushNewCommand("find_nearest_enemy", { hasEnemy: false });
    },

    has_enemy_around: () => {
      if (!this.level.enemies || this.level.enemies.length === 0)
        return false;

      const aroundPoints =[
        { x: this.level.hero.x + 1, y: this.level.hero.y },
        { x: this.level.hero.x - 1, y: this.level.hero.y },
        { x: this.level.hero.x, y: this.level.hero.y + 1 },
        { x: this.level.hero.x, y: this.level.hero.y - 1 },
        { x: this.level.hero.x + 1, y: this.level.hero.y + 1 },
        { x: this.level.hero.x + 1, y: this.level.hero.y - 1 },
        { x: this.level.hero.x - 1, y: this.level.hero.y + 1 },
        { x: this.level.hero.x - 1, y: this.level.hero.y - 1 },
      ];

      for (const point of aroundPoints) {
        if (this.getAliveEnemyAtPoint(point)) {
          this.pushNewCommand("has_enemy_around", { hasEnemy: true });
          return true;
        }
      }

      this.pushNewCommand("has_enemy_around", { hasEnemy: false });
      return false;
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

        if (this.isPointOutOfMap(projectilePoint) || this.isPointHitWall(projectilePoint))
          break;

        let hitEnemy = this.getAliveEnemyAtPoint(projectilePoint);
        if (hitEnemy) {
          hitEnemy.alive = false;
          break;
        }
      }
    }
  };

  gameplayError = null;

  commands = [];
  
  constructor(level) {
    this.initialLevel = structuredClone(level);
    this.level = structuredClone(level);
    this.engine = esper({
      language: 'python'
    });

    this.enemiesVariants = [this.initialLevel.enemies];

    if (this.initialLevel.checksCount) {
      for (let i = 0; i < this.initialLevel.checksCount; i++) {
        const newEnemies = [...this.initialLevel.enemies].map(e => {
          const clone = structuredClone(e);
          if (!clone.random)
            return clone;
          clone.alive = Math.random() < 0.5;
          return clone;
        });
        this.enemiesVariants.push(newEnemies);
      }
    }

    this.engine.addGlobal('hero', this.hero);
  }

  run(code) {
    const results = []
    for (const enemiesVariant of this.enemiesVariants) {
      this.gemsCollected = 0;
      this.level = structuredClone(this.initialLevel);
      this.level.enemies = structuredClone(enemiesVariant);
      this.level.gems = this.level.gems.filter(gem => !gem.guardedBy || this.level.enemies.find(e => e.name === gem.guardedBy).alive);

      // только для уровня с охраняемыми гемами
      if (this.level.id === 'if-guarded-gems') {
        this.ifGuardedGemsInfo = {
          canBeOnTopIsland: this.level.enemies.find(e => e.name === 'Hidden1').alive,
          canBeOnBottomIsland: this.level.enemies.find(e => e.name === 'Hidden2').alive,
          topIslandEnter: { x: 1, y: 6 },
          bottomIslandEnter: { x: 5, y: 6 },
        };
      }

      try {
        this.engine.load(code);
        let steps = 0;
        let value = this.engine.evloop.next();
        while (!value.done && !this.gameplayError) {
          value = this.engine.evloop.next();
          if ( value.value && value.value.then ) throw new Error('Can\'t deal with futures when running in sync mode');
          if ( ++steps > this.engine.options.executionLimit ) throw new Error('Execution Limit Reached');
        }
      } catch (e) {
  
        let message = ErrorMessageMapper.map(e.message);
        let line = e.loc.line ?? e.loc.start.line;
        return {
          errors: [
            {
              message,
              line,
            }
          ]
        }
      }
  
      const variantResult = {
        goals: this.level.goals.map(goal => { return { type: goal.type, required: goal.required, completed: this.isGoalCompleted(goal, code) } }),
        commands: this.commands,
        gameplayError: this.gameplayError,
      };

      results.push({ enemiesVariant, variantResult });
      this.commands = [];
    }

    return results;
  }

  isGoalCompleted(goal, code) {
    switch (goal.type) {
      case 'no-unnecessary-islands': // так можно, потому что выкидываем ошибку, когда зашли на лишний остров
      case 'finish':
        return arePointsEqual(this.level.finish, this.level.hero);
      case 'lines':
        return calculateCodeLines(code) <= goal.linesCount;
      case 'gems':
        return this.gemsCollected === this.level.gems.length;
      case 'enemies':
        return this.level.enemies.every(enemy => !enemy.alive)
      default:
        return false;
    }
  }

  updateHeroPos(newHeroPosition, moveCommandName) {
    while (!arePointsEqual(newHeroPosition, this.level.hero)) {
      this.level.hero.x += Math.sign(newHeroPosition.x - this.level.hero.x);
      this.level.hero.y += Math.sign(newHeroPosition.y - this.level.hero.y);

      if (this.isPointOutOfMap(this.level.hero) || this.isPointHitWall(this.level.hero)) {
        this.gameplayError = { type: GameplayErrorTypes.HERO_RAN_IN_WALL, wallPosition: this.level.hero };
        return;
      }

      if (this.getAliveEnemyAtPoint(this.level.hero)) {
        this.gameplayError = { type: GameplayErrorTypes.HERO_RAN_IN_ENEMY, enemyPosition: this.level.hero };
        return;
      }

      this.pushNewCommand(moveCommandName);

      // только для уровня с охраняемыми гемами
      if (this.ifGuardedGemsInfo) {
        if (arePointsEqual(this.ifGuardedGemsInfo.topIslandEnter, this.level.hero) && !this.ifGuardedGemsInfo.canBeOnTopIsland) {
          this.gameplayError = { type: GameplayErrorTypes.CANT_BE_HERE };
          return;
        }

        if (arePointsEqual(this.ifGuardedGemsInfo.bottomIslandEnter, this.level.hero) && !this.ifGuardedGemsInfo.canBeOnBottomIsland) {
          this.gameplayError = { type: GameplayErrorTypes.CANT_BE_HERE };
          return;
        }
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

  pushNewCommand(commandName, additionalInfo = {}) {
    let callExpression = this.engine.evaluator.lastASTNodeProcessed.parent.parent;
    let start = callExpression.loc.start;
    let end = callExpression.loc.end;
    let command = {
      name: commandName,
      start: { line: start.line, column: start.column },
      end: { line: end.line, column: end.column },
      ...additionalInfo
    };
    this.commands.push(command);
  }

  isPointOutOfMap(point) {
    return point.x >= this.level.height || point.y >= this.level.width || point.x < 0 || point.y < 0;
  }

  isPointHitWall(point) {
    return ['tree', 'rock', 'watert'].includes(this.level.grid[point.x][point.y]) && !this.isActiveBridgePoint(point);
  }

  isActiveBridgePoint(point) {
    return this.level.bridges.filter(bridge => bridge.activated).some(bridge => {
      if (bridge.vertical) {
        return bridge.start.y === point.y && bridge.start.x <= point.x && point.x <= bridge.end.x;
      } else {
        return bridge.start.x === point.x && bridge.start.y <= point.y && point.y <= bridge.end.y;
      }
    })
  }

  getAliveEnemyAtPoint(point) {
    if (!this.level.enemies || this.level.enemies.length === 0)
      return;

    return this.level.enemies.find(e => e.alive && arePointsEqual(e, point));
  }
}