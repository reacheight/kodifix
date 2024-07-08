import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useParams } from 'react-router-dom'
import './Level.css';

const Level = () => {
    const { id } = useParams()
    const [initialLevelData, setInitialLevelData] = useState(null);
    const [levelData, setLevelData] = useState(null);
    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        initializeLevel();
    }, []);

    const initializeLevel = () => {
        axios.get(`http://localhost:9000/level/${id}`)
            .then(response => {
                setInitialLevelData(response.data);
                setLevelData(response.data);
                
                const initialGoals = [{ name: 'finish', value: 'Достигнуть финиша', satisfied: false }];
                if (response.data.gems.length > 0) {
                    initialGoals.push({ name: 'gems', value: 'Собрать все алмазы', satisfied: false });
                }
                if (response.data.linesGoal) {
                    initialGoals.push({ name: 'lines', value: `Использовать не более ${response.data.linesGoal} строк кода`, satisfied: false })
                }
                setGoals(initialGoals);
            })
            .catch(error => {
                console.error('Error fetching level data:', error);
            });
    };

    const handleCodeChange = useCallback((val, _) => setCode(val), []);

    const handleRunClick = () => {
        setIsRunning(true);

        initializeLevel();

        axios.post(`http://localhost:9000/level/${id}/run`, { code })
            .then(async response => {
                console.log('Run response:', response.data);
                if (response.data.commands) {
                    await executeCommands(response.data.commands);
                }

                const updatedGoals = goals.map(goal => {
                    switch (goal.name) {
                        case 'finish':
                            return { ...goal, satisfied: response.data.hasFinished };
                        case 'gems':
                            return  { ...goal, satisfied: response.data.allGemsCollected };
                        case 'lines':
                            return  { ...goal, satisfied: response.data.numberOfLinesSatisfy };
                        default:
                            return goal;
                    }
                });
                setGoals(updatedGoals);

                if (response.data.heroRanInWall) {
                    window.alert('Герой врезался в стену!');
                }
            })
            .catch(error => {
                console.error('Error running code:', error);
                setIsRunning(false);
            });
    };

    const executeCommands = async (commands) => {
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            await moveHero(command.name);
        }
        setIsRunning(false);
    };

    const moveHero = (commandName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setLevelData(prev => {
                    const { hero } = prev;
                    const updatedHero = { ...hero };

                    switch (commandName) {
                        case 'move_up':
                            if (updatedHero.x > 0 && !isWall(updatedHero.x - 1, updatedHero.y)) {
                                updatedHero.x -= 1;
                            }
                            break;
                        case 'move_down':
                            if (updatedHero.x < initialLevelData.height - 1 && !isWall(updatedHero.x + 1, updatedHero.y)) {
                                updatedHero.x += 1;
                            }
                            break;
                        case 'move_right':
                            if (updatedHero.y < initialLevelData.width - 1 && !isWall(updatedHero.x, updatedHero.y + 1)) {
                                updatedHero.y += 1;
                            }
                            break;
                        case 'move_left':
                            if (updatedHero.y > 0 && !isWall(updatedHero.x, updatedHero.y - 1)) {
                                updatedHero.y -= 1;
                            }
                            break;
                        default:
                            break;
                    }

                    const updatedLevelData = {
                        ...prev,
                        hero: updatedHero,
                    };

                    const updatedGems = prev.gems.filter(gem => !(gem.x === updatedHero.x && gem.y === updatedHero.y));

                    const updatedGrid = Array.from({ length: initialLevelData.height }, () => Array(initialLevelData.width).fill('default'));

                    updatedGrid[updatedHero.x][updatedHero.y] = 'H';

                    updatedGrid[prev.finish.x][prev.finish.y] = 'F';

                    prev.walls.forEach(wall => {
                        updatedGrid[wall.x][wall.y] = 'W';
                    });

                    updatedGems.forEach(gem => {
                        updatedGrid[gem.x][gem.y] = 'G';
                    });

                    return { ...updatedLevelData, gems: updatedGems, grid: updatedGrid };
                });
                resolve();
            }, 200);
        });
    };

    const isWall = (x, y) => {
        return initialLevelData.walls.some(wall => wall.x === x && wall.y === y);
    };

    if (!levelData) {
        return <div>Loading...</div>;
    }

    const { height, width, hero, finish, walls, gems } = levelData;

    const grid = Array.from({ length: height }, () => Array(width).fill('default'));

    grid[finish.x][finish.y] = 'F';

    walls.forEach(wall => {
        grid[wall.x][wall.y] = 'W';
    });

    gems.forEach(gem => {
        grid[gem.x][gem.y] = 'G';
    });

    grid[hero.x][hero.y] = 'H';

    return (
        <div className="container">
          <div className="goals">
              <h3>Цели:</h3>
              <ul>
                  {goals.map((goal, index) => (
                      <li key={index}>{goal.satisfied ? `${goal.value} ✅` : goal.value}</li>
                  ))}
              </ul>
              {goals.every(g => g.satisfied) && <a href={`/level/${Number(id) + 1}`}>Следующий уровень</a>}
          </div>
            <div className="level-section">
                <div className="level">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, cellIndex) => (
                                <span key={cellIndex} className={`cell ${cell}`}>
                                    {cell === 'W' && <img src="/images/wall.png" alt="Wall" className="wall-image" />}
                                    {cell === 'F' && <img src='/images/finish.png' alt='Finish' className='finish-image' />}
                                    {cell === 'H' && <img src="/images/hero.png" alt="Hero" className="hero-image" />}
                                    {cell === 'G' && <img src='/images/gem.png' alt='Gem' className='gem-image' />}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="run-button" onClick={handleRunClick} disabled={isRunning}>
                    Запустить
                </button>
            </div>
            <div className='codeInputContainer'>
              <CodeMirror
                value={code} onChange={handleCodeChange}
                disabled={isRunning}
                height='100vh' width='700px'
                extensions={[python()]}
                basicSetup={{
                  autocompletion: false
                }}
                theme={'dark'}
                className='codeInput'
              />
            </div>
        </div>
    );
};

export default Level;
