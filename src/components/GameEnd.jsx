// Экран окончания игры с результатами
import { ru } from '../locales/ru.js';

export const GameEnd = ({ players, currentRole, winner, onPlayAgain, onBackToMenu }) => {
  const aliveCount = players.filter((p) => !p.isDead).length;
  const deadCount = players.filter((p) => p.isDead).length;
  const mafiaCount = players.filter((p) => p.role === 'mafia' && !p.isDead).length;
  const villagerCount = players.filter((p) => p.role !== 'mafia' && !p.isDead).length;

  const isWinner = winner === 'mafia' ? currentRole === 'mafia' : currentRole !== 'mafia';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Результат */}
        <div
          className={`rounded-xl shadow-2xl p-8 mb-8 text-center ${
            isWinner
              ? 'bg-gradient-to-br from-green-600 to-emerald-600'
              : 'bg-gradient-to-br from-red-600 to-pink-600'
          }`}
        >
          <h1 className="text-5xl font-bold mb-4">
            {isWinner ? '🎉 Вы выиграли!' : '😢 Вы проиграли'}
          </h1>

          <div className="text-2xl font-bold mb-2">
            {winner === 'mafia' ? '🎭 Победила мафия!' : '🌟 Победили мирные жители!'}
          </div>

          <p className="text-lg opacity-90">
            Ваша роль была: <span className="font-bold">{ru.roles[currentRole]}</span>
          </p>
        </div>

        {/* Статистика */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border-2 border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">📊 {ru.results.finalStats}</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-700">
              <p className="text-green-200 text-sm mb-1">Живые</p>
              <p className="text-3xl font-bold text-green-400">{aliveCount}</p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4 text-center border border-red-700">
              <p className="text-red-200 text-sm mb-1">Мертвые</p>
              <p className="text-3xl font-bold text-red-400">{deadCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-900/30 rounded-lg p-4 text-center border border-purple-700">
              <p className="text-purple-200 text-sm mb-1">Мафия живых</p>
              <p className="text-3xl font-bold text-purple-400">{mafiaCount}</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-700">
              <p className="text-blue-200 text-sm mb-1">Мирных живых</p>
              <p className="text-3xl font-bold text-blue-400">{villagerCount}</p>
            </div>
          </div>
        </div>

        {/* Список игроков */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border-2 border-gray-700">
          <h3 className="text-xl font-bold mb-4">🎮 Игроки и их роли</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  player.isDead
                    ? 'bg-gray-700 opacity-60 line-through'
                    : 'bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-sm text-gray-400">
                    {ru.roles[player.role]}
                  </span>
                </div>
                <span>
                  {player.isDead ? '💀' : '✓'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-lg shadow-lg"
          >
            🎮 Играть еще раз
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all text-lg shadow-lg"
          >
            ← На главное меню
          </button>
        </div>

        {/* Эмодзи */}
        <div className="text-center mt-8 text-4xl">
          {isWinner ? '🏆 🎉 🥳' : '😔 🎭 😢'}
        </div>
      </div>
    </div>
  );
};
