// Комната ожидания - отображение списка игроков и кнопка начала игры
import { ru } from '../locales/ru.js';

export const WaitingRoom = ({ roomCode, players, isCreator, onStartGame, onLeave, isLoading }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert('✅ ' + ru.room.copied);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🎭 Мафия</h1>
          <p className="text-white/80">{ru.room.waitingForPlayers}</p>
        </div>

        {/* Карточка комнаты */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          {/* Код комнаты */}
          <div className="mb-8">
            <p className="text-gray-600 text-sm font-semibold mb-2">{ru.room.code}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-lg p-4 font-mono font-bold text-2xl text-center text-purple-600">
                {roomCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all"
                title="Скопировать"
              >
                📋
              </button>
            </div>
          </div>

          {/* Список игроков */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-3">
              {ru.room.players} ({players.length}/10)
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800">{player.name}</span>
                  </div>
                  <span className="text-green-500 font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Информация */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p className="mb-2">👥 {ru.room.playersCount}: {players.length}/10</p>
            {players.length < 4 && (
              <p className="text-red-500 font-semibold">⚠️ {ru.room.minPlayers}</p>
            )}
            {isCreator && players.length >= 4 && (
              <p className="text-green-600 font-semibold">✅ Готово к старту!</p>
            )}
          </div>
        </div>

        {/* Кнопки */}
        <div className="space-y-3">
          {isCreator && (
            <button
              onClick={onStartGame}
              disabled={players.length < 4 || isLoading}
              className="w-full bg-green-500 text-white font-bold py-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-lg"
            >
              {isLoading ? '⏳ Запуск...' : '🎮 ' + ru.room.startGame}
            </button>
          )}
          {!isCreator && (
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center">
              <p className="text-sm">{ru.room.creatorOnly}</p>
            </div>
          )}
          <button
            onClick={onLeave}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all"
          >
            ← Выйти
          </button>
        </div>

        {/* Подсказка */}
        <div className="mt-8 text-center text-white/70 text-xs">
          <p>Поделитесь кодом комнаты с друзьями для присоединения</p>
        </div>
      </div>
    </div>
  );
};
