import React, { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';

const ROWS = 14;
const COLS = 25;

const generateFood = () => {
  return {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS),
  };
};

const App = () => {
  const [snake, setSnake] = React.useState([{ row: 12, col: 12 }]);
  const [direction, setDirection] = React.useState('RIGHT');
  const [food, setFood] = React.useState(generateFood());
  const [gameOver, setGameOver] = React.useState(false);
  const [isPause, setIsPause] = React.useState(false);
  const [localScore, setLocalScore] = React.useState(0);
  
  // Zustand store hooks
  const isLoading = useGameStore((state) => state.isLoading);
  const startGameSession = useGameStore((state) => state.startGameSession);
  const endGameSession = useGameStore((state) => state.endGameSession);
  const setLoading = useGameStore((state) => state.setLoading);

  const checkCollision = (snake) => {
    const head = snake[0];
    return (
      snake.slice(1).some((segment) => segment.row === head.row && segment.col === head.col) ||
      head.row < 0 ||
      head.row >= ROWS ||
      head.col < 0 ||
      head.col >= COLS
    );
  };


  const resetGame = () => {
    setSnake([{ row: 12, col: 12 }]);
    setDirection('RIGHT');
    setFood(generateFood());
    setGameOver(false);
    setLocalScore(0);
    setLoading(false);
    startGameSession('Snake');
  };

  useEffect(() => {
    if (!gameOver && !isPause) {
      const moveSnake = () => {
        const newSnake = snake.map((segment) => ({ ...segment }));

        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.row = (head.row - 1 + ROWS) % ROWS;
            break;
          case 'DOWN':
            head.row = (head.row + 1) % ROWS;
            break;
          case 'LEFT':
            head.col = (head.col - 1 + COLS) % COLS;
            break;
          case 'RIGHT':
            head.col = (head.col + 1) % COLS;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
          setFood(generateFood());
          setLocalScore(localScore + 10);
        } else {
          newSnake.pop();
        }

        if (checkCollision(newSnake)) {
          setGameOver(true);
          endGameSession(localScore);
        } else {
          setSnake(newSnake);
        }
      };

      const gameInterval = setInterval(moveSnake, 100);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, food, gameOver, isPause, localScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
  
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);
  
  // Start game session on mount
  useEffect(() => {
    startGameSession('Snake');
  }, [startGameSession]);
  



  return (
    <div className="text-center p-4 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
        React Snake Game
      </h1>
      
      <div className="w-full max-w-lg mx-auto mb-4">
        <div className="relative mx-auto w-96 h-80 border-2 border-purple-600 rounded-lg shadow-lg bg-gray-800">
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: COLS }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-4 h-4 ${
                    snake.some((segment) => segment.row === rowIndex && segment.col === colIndex)
                      ? 'bg-green-600 rounded-sm'
                      : food.row === rowIndex && food.col === colIndex 
                      ? 'bg-red-500 rounded-full'
                      : ''
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {gameOver && (
        <div className="fixed inset-0 bg-purple-200 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Game Over! <span className="text-green-600">Your Score 🐍 {localScore}</span>
            </p>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
            >
              Restart
            </button>
          </div>
        </div>
      )}
      
      <div className="fixed top-20 left-5 p-4 bg-gray-800 rounded-lg shadow-lg">
        <button 
          onClick={() => setIsPause(!isPause)}
          className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all mb-4"
        >
          {isPause ? 'Resume' : 'Pause'}
        </button>
        
        <p className="text-lg text-purple-400 mb-4">Score : 🚀 {localScore}</p>
        
        <div className="flex flex-col items-center space-y-2">
          <button 
            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-12 h-12" 
            onClick={() => setDirection('UP')}
          >
            ↑
          </button>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-12 h-12" 
              onClick={() => setDirection('LEFT')}
            >
              ←
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-12 h-12" 
              onClick={() => setDirection('RIGHT')}
            >
              →
            </button>
          </div>
          <button 
            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-12 h-12" 
            onClick={() => setDirection('DOWN')}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;