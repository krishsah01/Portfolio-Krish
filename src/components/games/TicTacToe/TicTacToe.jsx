import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import RoomPage from './RoomPage';

const API_BASE_URL = 'https://game-room-api.fly.dev/api/rooms';

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="w-16 h-16 m-1 text-2xl font-bold cursor-pointer border-2 border-white bg-transparent text-white hover:bg-gray-700 transition-all"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ gameState, onPlay }) {
  const flatSquares = gameState.board.flat();

  function handleClick(i) {
    const row = Math.floor(i / 3);
    const col = i % 3;

    if (gameState.board[row][col] || calculateWinner(flatSquares)) return;

    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = gameState.currentPlayer;

    const updatedState = {
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
    };

    onPlay(updatedState);
  }

  return (
      <>
        {[0, 1, 2].map(r => (
          <div key={r} className="flex justify-center mb-1">
            {[0, 1, 2].map(c => {
              const i = r * 3 + c;
              return (
                <Square
                  key={i}
                  value={flatSquares[i]}
                  onSquareClick={() => handleClick(i)}
                />
              );
            })}
          </div>
        ))}
      </>
  );
}

export default function Game() {
  const [roomID, setRoomID] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [inRoomPage, setInRoomPage] = useState(true); 
  const handleRoomJoin = (id, state) => {
    setRoomID(id);
    setGameState(state);
    setInRoomPage(false);
  };
  useEffect(() => {
    if (!roomID) return;
  
    const interval = setInterval(() => {
      fetchRoom();
    }, 5000);
  
    return () => clearInterval(interval);
  }, [roomID]);
  

  async function updateRoomState(updatedState) {
    if (!roomID) return;
    await axios.put(`${API_BASE_URL}/${roomID}`, {
      gameState: updatedState,
    });
  }

  function handlePlay(updatedState) {
    setGameState(updatedState);
    updateRoomState(updatedState);
  }

  async function fetchRoom() {
    if (!roomID) return;
    const response = await axios.get(`${API_BASE_URL}/${roomID}`);
    setGameState(response.data.gameState);
  }

  async function resetGame() {
    if (!window.confirm("Start a new room?")) return;
    const response = await axios.post(API_BASE_URL, {
      initialState: {
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        currentPlayer: 'X',
      },
    });
    setRoomID(response.data.roomId);
    setGameState(response.data.gameState);
  }

  const winner = gameState ? calculateWinner(gameState.board.flat()) : null;
  const status = winner
    ? `Winner: ${winner}`
    : gameState
      ? `Next player: ${gameState.currentPlayer}`
      : "";

  return (
    <div className="max-w-4xl mx-auto p-5 text-center text-white">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      {inRoomPage ? (
        <RoomPage onRoomJoin={handleRoomJoin} />
      ) : (
        <div className="flex flex-col lg:flex-row justify-between mt-5 gap-5 flex-wrap">
          <div className="flex-1 min-w-72">
            <div className="mb-3 font-bold text-lg">{status}</div>
            <Board gameState={gameState} onPlay={handlePlay} />
          </div>
          <div className="flex-1 min-w-56 flex flex-col items-center gap-3 mt-2">
            <p className="text-lg">Room Code: <strong className="text-blue-400">{roomID}</strong></p>
            <button 
              onClick={fetchRoom}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
            >
              Refresh Game
            </button>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
            >
              Create New Room
            </button>
            <button 
              onClick={() => setInRoomPage(true)}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
            >
              Back to Room Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
