import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://game-room-api.fly.dev/api/rooms';

export default function RoomPage({ onRoomJoin }) {
  const [inputRoomID, setInputRoomID] = useState("");

  const handleJoin = async () => {
    if (!inputRoomID) return alert("Enter a room ID.");
    try {
      const response = await axios.get(`${API_BASE_URL}/${inputRoomID}`);
      onRoomJoin(inputRoomID, response.data.gameState);
    } catch (error) {
      alert("Room not found.");
    }
  };

  const handleCreate = async () => {
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
    onRoomJoin(response.data.roomId, response.data.gameState);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Join a Room</h2>
      <input
        type="text"
        value={inputRoomID}
        placeholder="Enter Room ID"
        onChange={(e) => setInputRoomID(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
      />
      <button onClick={handleJoin} className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-full">
        Join Room
      </button>
      <hr className="my-4" />
      <h2 className="text-2xl font-bold mb-4">Or Create a New Room</h2>
      <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-full">
        Create Room
      </button>
    </div>
  );
}
