import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTimes, FaPlay } from 'react-icons/fa';

interface GameHubProps {}

// Game data
const games = [
  {
    id: 'snake',
    title: 'Snake Game',
    description: 'Classic arcade game where you control a snake to eat food and grow longer',
    icon: '🐍',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    difficulty: 'Easy',
    players: '1 Player'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Strategic game on a 3x3 grid - get three in a row to win',
    icon: '⭕',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    difficulty: 'Easy',
    players: '1-2 Players'
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the hidden 5-letter word in 6 attempts',
    icon: '📝',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    difficulty: 'Medium',
    players: '1 Player'
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    description: 'Classic hand game - rock beats scissors, scissors beats paper, paper beats rock',
    icon: '✂️',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    difficulty: 'Easy',
    players: '1 Player'
  },
  {
    id: 'hangman',
    title: 'Hangman',
    description: 'Guess the word letter by letter before the drawing is complete',
    icon: '🎭',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    difficulty: 'Medium',
    players: '1 Player'
  }
];

// Simple Game Components (placeholder implementations)
const SnakeGame = () => (
  <div className="text-center py-8">
    <div className="text-6xl mb-4">🐍</div>
    <h3 className="text-xl font-bold mb-4">Snake Game</h3>
    <p className="text-gray-400 mb-6">Use arrow keys to control the snake</p>
    <div className="bg-gray-800 w-64 h-64 mx-auto rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Game would be implemented here</div>
    </div>
  </div>
);

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = board.every(square => square !== null) && !winner;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">⭕</div>
      <h3 className="text-xl font-bold mb-4">Tic Tac Toe</h3>
      <div className="mb-4">
        {winner ? (
          <p className="text-green-400 font-bold">Winner: {winner}!</p>
        ) : isDraw ? (
          <p className="text-yellow-400 font-bold">It's a draw!</p>
        ) : (
          <p className="text-gray-400">Next player: {isXNext ? 'X' : 'O'}</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-4">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-14 h-14 bg-gray-700 border border-gray-600 rounded-lg text-2xl font-bold text-white hover:bg-gray-600 transition-colors"
          >
            {square}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

const WordleGame = () => (
  <div className="text-center py-8">
    <div className="text-6xl mb-4">📝</div>
    <h3 className="text-xl font-bold mb-4">Wordle</h3>
    <p className="text-gray-400 mb-6">Guess the 5-letter word</p>
    <div className="space-y-2 mb-6">
      {[...Array(6)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {[...Array(5)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-12 h-12 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xl font-bold"
            >
              {rowIndex === 0 && colIndex < 3 ? ['W', 'O', 'R'][colIndex] : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="text-gray-500">Full Wordle implementation would go here</div>
  </div>
);

const RockPaperScissorsGame = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const choices = [
    { name: 'rock', icon: '🗿', beats: 'scissors' },
    { name: 'paper', icon: '📄', beats: 'rock' },
    { name: 'scissors', icon: '✂️', beats: 'paper' }
  ];

  const playGame = (playerChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)].name;
    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);

    if (playerChoice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Computer wins!');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">✂️</div>
      <h3 className="text-xl font-bold mb-4">Rock Paper Scissors</h3>
      
      <div className="mb-6">
        <div className="text-lg mb-2">Score: You {score.player} - {score.computer} Computer</div>
        {result && <div className="text-xl font-bold text-yellow-400">{result}</div>}
      </div>

      {playerChoice && computerChoice && (
        <div className="mb-6 flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {choices.find(c => c.name === playerChoice)?.icon}
            </div>
            <div>You</div>
          </div>
          <div className="text-2xl">VS</div>
          <div className="text-center">
            <div className="text-4xl mb-2">
              {choices.find(c => c.name === computerChoice)?.icon}
            </div>
            <div>Computer</div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => playGame(choice.name)}
            className="text-4xl p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title={choice.name}
          >
            {choice.icon}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors"
      >
        Reset Score
      </button>
    </div>
  );
};

const HangmanGame = () => (
  <div className="text-center py-8">
    <div className="text-6xl mb-4">🎭</div>
    <h3 className="text-xl font-bold mb-4">Hangman</h3>
    <p className="text-gray-400 mb-6">Guess the word letter by letter</p>
    <div className="mb-6">
      <div className="text-2xl font-mono mb-4">_ _ _ _ _</div>
      <div className="text-gray-500">Wrong guesses: 0/6</div>
    </div>
    <div className="text-gray-500">Full Hangman implementation would go here</div>
  </div>
);

const gameComponents = {
  'snake': SnakeGame,
  'tic-tac-toe': TicTacToeGame,
  'wordle': WordleGame,
  'rock-paper-scissors': RockPaperScissorsGame,
  'hangman': HangmanGame
};

const GameHub = forwardRef<HTMLElement, GameHubProps>((_props, ref) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const openGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const GameComponent = selectedGame ? gameComponents[selectedGame as keyof typeof gameComponents] : null;

  return (
    <section ref={ref} className="section relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" id="gamehub">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat bg-[length:60px_60px]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
            >
              <FaGamepad className="text-3xl text-white" />
            </motion.div>
            <h2 className="heading text-center mb-4">GameHub</h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              A collection of classic games built with React. Test your skills and have fun!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => openGame(game.id)}
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                    <span className="bg-gray-800 px-2 py-1 rounded-full">{game.difficulty}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-full">{game.players}</span>
                  </div>
                  
                  <button className={`w-full ${game.color} ${game.hoverColor} text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center gap-2`}>
                    <FaPlay className="text-sm" />
                    Play Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Game Logic'].map((tech, i) => (
                <span key={i} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && GameComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeGame}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGame}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
              
              <div className="pr-8">
                <GameComponent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

GameHub.displayName = 'GameHub';
export default GameHub;
