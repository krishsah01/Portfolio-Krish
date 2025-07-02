import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

const GameView = ({ roomId, gameState, setGameState }) => {
  const userName = localStorage.getItem("username");
  const [userChoice, setUserChoice] = useState("rock");

  useEffect(() => {
    if (!gameState) return;
  
    const players = gameState.players || {};
    let updated = false;
  
    if (!players.player1) {
      players.player1 = userName;
      updated = true;
    } else if (!players.player2 && players.player1 !== userName) {
      players.player2 = userName;
      updated = true;
    }
  
    if (updated) {
      const updatedState = {
        ...gameState,
        players,
        currentTurn: players.player1,
      };
      updateGameState(updatedState);
    }
  }, [gameState, userName]);
  


  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE_URL}/${roomId}`);
      const data = await res.json();
      setGameState(data.gameState);
    }, 1500);

    return () => clearInterval(interval);
  }, [roomId]);

  const updateGameState = async (updatedState) => {
    await fetch(`${API_BASE_URL}/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: updatedState }),
    });
    setGameState(updatedState);
  };

  const revealWinner = async (moves) => {
    const [p1, p2] = [gameState.players.player1, gameState.players.player2];
    const move1 = moves[p1];
    const move2 = moves[p2];
    let result = "";
  
    if (move1 === move2) {
      result = "It's a Tie!";
    } else if (
      (move1 === "rock" && move2 === "scissors") ||
      (move1 === "paper" && move2 === "rock") ||
      (move1 === "scissors" && move2 === "paper")
    ) {
      result = `${p1} wins!`;
    } else {
      result = `${p2} wins!`;
    }
  
    const newHistory = [
      ...(gameState.history || []),
      `${p1} chose ${move1}, ${p2} chose ${move2}. ${result}`
    ];
  
    const resetState = {
      ...gameState,
      moves: {},
      history: newHistory,
      currentTurn: gameState.currentTurn === p1 ? p2 : p1
    };
  
    await updateGameState(resetState);
  };
  

  const handlePlay = async () => {
    if (!gameState.players || !gameState.players.player1 || !gameState.players.player2) {
      alert("Waiting for another player...");
      return;
    }
  
    if (gameState.moves?.[userName]) {
      alert("You already made your move. Wait for the other player!");
      return;
    }
  
    const updatedMoves = {
      ...(gameState.moves || {}),
      [userName]: userChoice,
    };
  
    const nextPlayer = userName === gameState.players.player1
      ? gameState.players.player2
      : gameState.players.player1;
  
    const updatedState = {
      ...gameState,
      moves: updatedMoves,
      currentTurn: nextPlayer, 
    };
  
    await updateGameState(updatedState);
  
    if (updatedMoves[gameState.players.player1] && updatedMoves[gameState.players.player2]) {
      revealWinner(updatedMoves);
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-black">
      <h2 className="text-2xl font-bold mb-4">Room ID: {roomId}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-lg"><span className="font-semibold">Player 1:</span> {gameState.players?.player1 || "Waiting..."}</p>
          <p className="text-lg"><span className="font-semibold">Player 2:</span> {gameState.players?.player2 || "Waiting..."}</p>
        </div>
        <div>
          <p className="text-lg"><span className="font-semibold">Current Turn:</span> {gameState.currentTurn || "Waiting..."}</p>
        </div>
      </div>

      <form className="mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="user-selection" className="text-lg font-medium">Select your choice:</label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg"
            id="user-selection"
            name="user-selection"
            onChange={(e) => setUserChoice(e.target.value)}
          >
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
            type="button"
            onClick={handlePlay}
          >
            Play
          </button>
        </div>
      </form>

      <div className="mb-6">
        <h4 className="text-xl font-bold mb-3">Game Log:</h4>
        <ul className="space-y-1 bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
          {(gameState.history || []).map((entry, index) => (
            <li key={index} className="text-sm">{entry}</li>
          ))}
        </ul>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all"
        onClick={() => {
          const resetState = {
            ...gameState,
            currentTurn: gameState.players?.player1,
            history: [],
          };
          updateGameState(resetState);
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default GameView;
