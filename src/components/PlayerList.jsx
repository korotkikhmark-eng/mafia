// Компонент списка игроков с выбором целей
import { ru } from '../locales/ru.js';

export const PlayerList = ({
  players,
  currentPlayerId,
  mafiaAllies = [],
  onSelectTarget,
  selectedTarget,
  currentPhase,
  activeRole,
}) => {
  const alivePlayers = players.filter((p) => !p.isDead);
  const deadPlayers = players.filter((p) => p.isDead);

  const isActionPhase = (currentPhase === 'night' || currentPhase === 'voting') && activeRole;

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 h-full max-h-96 md:max-h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        👥 {ru.room.players} ({alivePlayers.length}/{players.length})
      </h2>

      {/* Живые игроки */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 font-semibold mb-2">Живые игроки:</p>
        <div className="space-y-2">
          {alivePlayers.map((player) => {
            const isCurrentPlayer = player.id === currentPlayerId;
            const isAlly = mafiaAllies.includes(player.id);
            const isSelected = selectedTarget === player.id;
            const canSelect = !isCurrentPlayer && !isAlly;

            return (
              <button
                key={player.id}
                onClick={() => {
                  if (isActionPhase && canSelect) {
                    onSelectTarget(player.id);
                  }
                }}
                disabled={isCurrentPlayer || !isActionPhase || isAlly}
                className={`w-full text-left p-3 rounded-lg transition-all font-semibold flex items-center justify-between ${
                  isCurrentPlayer
                    ? 'bg-blue-900 border-2 border-blue-500 cursor-default'
                    : isAlly
                    ? 'bg-gray-700 border-2 border-gray-500 cursor-not-allowed opacity-50'
                    : isSelected
                    ? 'bg-green-600 border-2 border-green-400 cursor-pointer scale-105'
                    : isActionPhase
                    ? 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent cursor-pointer'
                    : 'bg-gray-700 border-2 border-transparent'
                }`}
                title={isAlly ? 'Это союзник мафии!' : ''}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{player.name}</span>
                  {isCurrentPlayer && <span className="text-yellow-300 ml-auto">👑</span>}
                  {isAlly && <span className="text-red-400 ml-auto">🤐</span>}
                </div>
                {isSelected && <span className="text-lg">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Мертвые игроки */}
      {deadPlayers.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 font-semibold mb-2">Мертвые игроки:</p>
          <div className="space-y-2 opacity-60">
            {deadPlayers.map((player) => (
              <div
                key={player.id}
                className="w-full text-left p-3 rounded-lg bg-gray-800 border-2 border-gray-600 font-semibold flex items-center gap-2 line-through"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-bold">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <span>{player.name}</span>
                <span className="ml-auto">💀</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Информация о действиях */}
      {currentPhase === 'night' && activeRole && (
        <div className="mt-4 p-3 bg-indigo-900/30 border border-indigo-500 rounded text-sm text-indigo-200">
          <p className="font-semibold">Выберите цель, нажав на имя игрока</p>
        </div>
      )}

      {currentPhase === 'voting' && (
        <div className="mt-4 p-3 bg-pink-900/30 border border-pink-500 rounded text-sm text-pink-200">
          <p className="font-semibold">Голосуйте за исключение игрока</p>
          {mafiaAllies.length > 0 && (
            <p className="text-xs mt-1 opacity-80">🤐 Союзники мафии отмечены и недоступны</p>
          )}
        </div>
      )}
    </div>
  );
};
