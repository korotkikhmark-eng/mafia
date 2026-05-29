// Главное меню - выбор создания/присоединения к комнате
import { useState } from 'react';
import { ru } from '../locales/ru.js';

export const MainMenu = ({ onCreateRoom, onJoinRoom, isLoading, error }) => {
  const [view, setView] = useState('main'); // 'main', 'create', 'join'
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [nameError, setNameError] = useState('');

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      setNameError('Введите ваше имя');
      return;
    }
    setNameError('');
    onCreateRoom(playerName);
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setNameError('Введите ваше имя');
      return;
    }
    if (!roomCode.trim()) {
      setNameError('Введите код комнаты');
      return;
    }
    setNameError('');
    onJoinRoom(roomCode, playerName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">🎭</h1>
          <h2 className="text-4xl font-bold text-white mb-2">{ru.menu.title}</h2>
          <p className="text-xl text-white/80">{ru.menu.subtitle}</p>
        </div>

        {/* Основное меню */}
        {view === 'main' && (
          <div className="space-y-4">
            <button
              onClick={() => setView('create')}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-lg"
            >
              {ru.menu.createRoom}
            </button>
            <button
              onClick={() => setView('join')}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-lg"
            >
              {ru.menu.joinRoom}
            </button>
          </div>
        )}

        {/* Создание комнаты */}
        {view === 'create' && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {ru.menu.createRoom}
            </h3>

            <input
              type="text"
              placeholder={ru.menu.namePlaceholder}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
            />

            {nameError && (
              <p className="text-red-500 text-sm mb-4">{nameError}</p>
            )}

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCreateRoom}
                disabled={isLoading}
                className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? '⏳ Создание...' : ru.menu.play}
              </button>
              <button
                onClick={() => {
                  setView('main');
                  setPlayerName('');
                  setNameError('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
              >
                {ru.menu.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Присоединение к комнате */}
        {view === 'join' && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {ru.menu.joinRoom}
            </h3>

            <input
              type="text"
              placeholder={ru.menu.namePlaceholder}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
            />

            <input
              type="text"
              placeholder={ru.menu.roomCodePlaceholder}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength="6"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500 font-mono font-bold text-center text-lg"
            />

            {nameError && (
              <p className="text-red-500 text-sm mb-4">{nameError}</p>
            )}

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleJoinRoom}
                disabled={isLoading}
                className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? '⏳ Подключение...' : ru.menu.play}
              </button>
              <button
                onClick={() => {
                  setView('main');
                  setPlayerName('');
                  setRoomCode('');
                  setNameError('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
              >
                {ru.menu.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Подсказка */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>💡 Совет: используйте хромбук или телефон для лучшего опыта</p>
        </div>
      </div>
    </div>
  );
};
