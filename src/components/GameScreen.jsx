// Основной игровой экран - главный интерфейс во время игры
import { useState } from 'react';
import { ru } from '../locales/ru.js';
import { PlayerList } from './PlayerList.jsx';
import { ChatBox } from './ChatBox.jsx';

export const GameScreen = ({
  players,
  playerId,
  currentRole,
  currentPhase,
  messages,
  mafiaAllies,
  onSendMessage,
  onPerformNightAction,
  onVote,
  selectedNightTarget,
  selectedVoteTarget,
  nightResults,
  onLeave,
}) => {
  const [showChat, setShowChat] = useState(true);
  const [showPlayers, setShowPlayers] = useState(true);

  // Получение текущего игрока
  const currentPlayer = players.find((p) => p.id === playerId);

  // Описание фазы
  const getPhaseInfo = () => {
    switch (currentPhase) {
      case 'night':
        return {
          title: '🌙 ' + ru.phases.night,
          description: ru.phases.nightMessage,
          color: 'from-indigo-600 to-purple-600',
        };
      case 'day':
        return {
          title: '☀️ ' + ru.phases.day,
          description: ru.phases.dayMessage,
          color: 'from-yellow-500 to-orange-500',
        };
      case 'voting':
        return {
          title: '🗳️ ' + ru.phases.voting,
          description: ru.phases.votingMessage,
          color: 'from-pink-500 to-red-500',
        };
      default:
        return {
          title: 'Игра',
          description: 'Ожидание...',
          color: 'from-gray-500 to-gray-600',
        };
    }
  };

  const phaseInfo = getPhaseInfo();

  // Активные роли, которые действуют ночью
  const activeRoleForNight = ['mafia', 'sheriff', 'doctor'].includes(currentRole);

  // Определяем активна ли роль (для ночи - только активные роли, для голосования - все живые)
  const isRoleActive = currentPhase === 'voting' 
    ? !currentPlayer?.isDead // Во время голосования все живые могут голосовать
    : activeRoleForNight; // Ночью только активные роли

  // Доступные цели для действия (живые игроки кроме себя)
  const availableTargets = players.filter((p) => !p.isDead && p.id !== playerId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-2 md:p-4">
      {/* Верхняя панель с информацией о фазе */}
      <div className={`bg-gradient-to-r ${phaseInfo.color} rounded-lg p-4 mb-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{phaseInfo.title}</h1>
            <p className="text-white/80">{phaseInfo.description}</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-white/70">Ваша роль:</p>
            <p className="text-lg font-bold">{ru.roles[currentRole] || 'Неизвестна'}</p>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Слева: Список игроков */}
        <div className="lg:col-span-1">
          {showPlayers && (
            <PlayerList
              players={players}
              currentPlayerId={playerId}
              mafiaAllies={currentRole === 'mafia' ? mafiaAllies : []}
              onSelectTarget={(targetId) => {
                if (currentPhase === 'night' && activeRoleForNight) {
                  onPerformNightAction(targetId);
                }
                if (currentPhase === 'voting') {
                  onVote(targetId);
                }
              }}
              selectedTarget={currentPhase === 'night' ? selectedNightTarget : selectedVoteTarget}
              currentPhase={currentPhase}
              activeRole={isRoleActive}
            />
          )}
        </div>

        {/* Центр/Справа: Чат */}
        <div className="lg:col-span-2">
          {showChat && (
            <ChatBox
              messages={messages}
              currentPhase={currentPhase}
              isDead={currentPlayer?.isDead || false}
              onSendMessage={onSendMessage}
            />
          )}
        </div>
      </div>

      {/* Ночные действия (если активная роль) */}
      {currentPhase === 'night' && activeRoleForNight && (
        <div className="bg-indigo-900/50 border-2 border-indigo-500 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-lg mb-3">🌙 {ru.phases.nightAction}</h3>
          <p className="text-sm text-indigo-200 mb-3">⏳ Ожидание действий других участников...</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availableTargets.map((target) => (
              <button
                key={target.id}
                onClick={() => onPerformNightAction(target.id)}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  selectedNightTarget === target.id
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {target.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Нижняя панель управления */}
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        <button
          onClick={() => setShowPlayers(!showPlayers)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          👥 {showPlayers ? 'Скрыть' : 'Показать'} игроков
        </button>
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          💬 {showChat ? 'Скрыть' : 'Показать'} чат
        </button>
        <button
          onClick={onLeave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all ml-auto"
        >
          ← Выйти
        </button>
      </div>
    </div>
  );
};
