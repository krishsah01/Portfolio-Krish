import React, { useState, useEffect, useCallback } from "react";

const gameConfig = {
  attempts: 6,
  wordLength: 5,
};

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: gameConfig.attempts }, () =>
      Array(gameConfig.wordLength).fill("")
    )
  );
  const [targetWord, setTargetWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    async function fetchRandomWord() {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${gameConfig.wordLength}`
      );
      const data = await response.json();
      setTargetWord(data[0].toUpperCase());
    }
    fetchRandomWord();
  }, []);

  // https://it3049c-hangman.fly.dev/

  const updateGrid = useCallback(
    (row, col, letter) => {
      const newGrid = [...grid];
      newGrid[row][col] = letter;
      setGrid(newGrid);
    },
    [grid]
  );

  const handleKeyDown = useCallback(
    async (event) => {
      if (gameOver) return;

      const userInput = event.key.toUpperCase();
      if (/^[A-Z]$/.test(userInput) && currentPosition < gameConfig.wordLength) {
        updateGrid(currentAttempt, currentPosition, userInput);
        setCurrentPosition((pos) => pos + 1);
      } else if (userInput === "BACKSPACE" && currentPosition > 0) {
        setCurrentPosition((pos) => pos - 1);
        updateGrid(currentAttempt, currentPosition - 1, "");
      } else if (userInput === "ENTER" && currentPosition === gameConfig.wordLength) {
        const currentWord = grid[currentAttempt].join("");
        const isValid = await isWordValid(currentWord);
        if (!isValid) {
          alert("Invalid word!");
          return;
        }

        revealAttemptResult(currentWord);

        if (currentWord === targetWord) {
          setGameWon(true);
          setGameOver(true);
        } else if (currentAttempt + 1 < gameConfig.attempts) {
          setCurrentAttempt((attempt) => attempt + 1);
          setCurrentPosition(0);
        } else {
          setGameOver(true);
        }
      }
    },
    [grid, currentPosition, currentAttempt, targetWord, gameOver, updateGrid]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  async function isWordValid(word) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking word validity:", error);
      return false;
    }
  }

  function checkWordLetters(word) {
    return word.split("").map((letter, index) => {
      if (letter === targetWord[index]) return "correct";
      if (targetWord.includes(letter)) return "misplaced";
      return "incorrect";
    });
  }

  function revealAttemptResult(word) {
    const results = checkWordLetters(word);
    const newGrid = [...grid];
    results.forEach((result, index) => {
      newGrid[currentAttempt][index] = { letter: word[index], result };
    });
    setGrid(newGrid);
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Wordle</h1>
      <div className="grid grid-rows-6 gap-2 mb-6">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2 justify-center">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`w-14 h-14 border-2 border-gray-600 text-white uppercase text-2xl font-bold flex justify-center items-center ${
                  typeof cell === "object" 
                    ? cell.result === "correct" 
                      ? "bg-green-600 border-green-600" 
                      : cell.result === "misplaced" 
                        ? "bg-yellow-500 border-yellow-500" 
                        : cell.result === "incorrect" 
                          ? "bg-gray-700 border-gray-700" 
                          : ""
                    : ""
                }`}
              >
                {typeof cell === "object" ? cell.letter : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={`text-center text-lg mt-5 p-4 rounded-lg ${
          gameWon 
            ? "bg-green-600/20 text-green-400" 
            : "bg-red-600/20 text-red-400"
        }`}>
          {gameWon ? "Congratulations! You won!" : `Game Over! The word was ${targetWord}.`}
        </div>
      )}
      <div className="mt-6">
        <p className="text-sm text-gray-400">Type letters and press Enter to guess</p>
      </div>
    </div>
  );
};

export default WordleGame;
