// Главный компонент приложения - управляет всеми экранами
import { useEffect } from 'react';
import { connectSocket } from './utils/socket.js';
import { useGame } from './hooks/useGame.js';
import { MainMenu } from './components/MainMenu.jsx';
import { WaitingRoom } from './components/WaitingRoom.jsx';
import { GameScreen } from './components/GameScreen.jsx';
import { GameEnd } from './components/GameEnd.jsx';

function App() {
  const game = useGame();

  // Инициализация подключения к серверу при монтировании
  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
    connectSocket(serverUrl);
  }, []);

  // Определяем, кто создатель комнаты (первый игрок в списке)
  const isCreator = game.roomCode && game.players.length > 0
    ? game.players[0].id === game.playerId
    : false;

  return (
    <div className="w-full h-screen font-sans">
      {/* Главное меню */}
      {game.gameState === 'menu' && (
        <MainMenu
          onCreateRoom={game.createRoom}
          onJoinRoom={game.joinRoom}
          isLoading={game.isLoading}
          error={game.error}
        />
      )}

      {/* Комната ожидания */}
      {game.gameState === 'waiting' && (
        <WaitingRoom
          roomCode={game.roomCode}
          players={game.players}
          isCreator={isCreator}
          onStartGame={game.startGame}
          onLeave={game.disconnect}
          isLoading={game.isLoading}
        />
      )}

      {/* Основной игровой экран */}
      {game.gameState === 'playing' && (
        <GameScreen
          players={game.players}
          playerId={game.playerId}
          currentRole={game.currentRole}
          currentPhase={game.currentPhase}
          messages={game.messages}
          mafiaAllies={game.mafiaAllies}
          onSendMessage={game.sendMessage}
          onPerformNightAction={game.performNightAction}
          onVote={game.vote}
          selectedNightTarget={game.selectedNightTarget}
          selectedVoteTarget={game.selectedVoteTarget}
          nightResults={game.nightResults}
          onLeave={game.disconnect}
        />
      )}

      {/* Экран окончания игры */}
      {game.gameState === 'ended' && (
        <GameEnd
          players={game.players}
          currentRole={game.currentRole}
          winner={game.gameWinner}
          onPlayAgain={() => {
            // Для простоты - просто возвращаемся в меню
            game.disconnect();
          }}
          onBackToMenu={game.disconnect}
        />
      )}

      {/* Уведомления об ошибках */}
      {game.error && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <p className="font-bold mb-2">❌ Ошибка</p>
          <p>{game.error}</p>
          <button
            onClick={() => game.setError(null)}
            className="mt-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
