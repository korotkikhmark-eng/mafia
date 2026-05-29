// Кастомный хук useGame - управляет состоянием игры и WebSocket событиями
import { useState, useEffect, useRef, useCallback } from 'react';
import { getSocket, on } from '../utils/socket.js';

export const useGame = () => {
  // Состояние текущей комнаты
  const [roomCode, setRoomCode] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'waiting', 'playing', 'ended'
  const [currentPhase, setCurrentPhase] = useState(null); // 'night', 'day', 'voting'
  const [currentRole, setCurrentRole] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ночные действия и голосование
  const [selectedNightTarget, setSelectedNightTarget] = useState(null);
  const [selectedVoteTarget, setSelectedVoteTarget] = useState(null);
  const [nightResults, setNightResults] = useState(null);
  const [gameWinner, setGameWinner] = useState(null); // Победитель игры
  const [mafiaAllies, setMafiaAllies] = useState([]); // IDs других членов мафии

  const socket = useRef(null);
  const unsubscribesRef = useRef([]);

  // Инициализация Socket.IO при монтировании
  useEffect(() => {
    socket.current = getSocket();

    // Подписываемся на основные события
    const unsubscribe1 = on('playersUpdated', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    const unsubscribe2 = on('roleAssigned', ({ role, allies = [], allyNotification }) => {
      setCurrentRole(role);
      // Сохраняем ID союзников (других членов мафии)
      setMafiaAllies(allies.map((a) => a.id));
      
      // Показываем уведомление о союзниках если они есть
      if (allyNotification) {
        addSystemMessage(allyNotification);
      }
    });

    const unsubscribe3 = on('gameStarted', () => {
      setGameState('playing');
    });

    const unsubscribe4 = on('phaseChanged', ({ phase, message }) => {
      setCurrentPhase(phase);
      addSystemMessage(message);
    });

    const unsubscribe4b = on('nightSubPhaseChanged', ({ subPhase, message }) => {
      addSystemMessage(message);
    });

    const unsubscribe5 = on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    const unsubscribe5b = on('sheriffCheckResult', ({ message }) => {
      addSystemMessage(message);
    });

    const unsubscribe6 = on('nightEnded', (results) => {
      setNightResults(results);
      // Обновляем список игроков (с актуальным статусом isDead)
      if (results.players) {
        setPlayers(results.players);
      }
      if (results.killed) {
        addSystemMessage(`${results.killed} был убит мафией!`);
      }
      if (results.healed) {
        addSystemMessage(`${results.healed} был спасен доктором!`);
      }
    });

    const unsubscribe7 = on('votingEnded', ({ eliminatedPlayer }) => {
      if (eliminatedPlayer) {
        addSystemMessage(`${eliminatedPlayer.name} исключен голосованием!`);
      }
    });

    const unsubscribe8 = on('gameEnded', ({ winner, players: endGamePlayers }) => {
      setGameState('ended');
      setGameWinner(winner);
      // Обновляем информацию об игроках (с их ролями)
      if (endGamePlayers) {
        setPlayers(endGamePlayers);
      }
      if (winner === 'mafia') {
        addSystemMessage('🎭 Победила мафия!');
      } else if (winner === 'villagers') {
        addSystemMessage('🌟 Победили мирные жители!');
      }
    });

    unsubscribesRef.current = [
      unsubscribe1, unsubscribe2, unsubscribe3, unsubscribe4, unsubscribe4b,
      unsubscribe5, unsubscribe5b, unsubscribe6, unsubscribe7, unsubscribe8,
    ];

    return () => {
      unsubscribesRef.current.forEach((unsub) => unsub());
    };
  }, []);

  // Добавить системное сообщение
  const addSystemMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        playerId: 'system',
        playerName: 'Система',
        message: text,
        timestamp: Date.now(),
      },
    ]);
  };

  // Создание комнаты
  const createRoom = useCallback((playerName) => {
    setIsLoading(true);
    setError(null);

    socket.current.emit('createRoom', playerName, (response) => {
      setIsLoading(false);

      if (response.success) {
        setRoomCode(response.roomCode);
        setPlayerId(response.playerId);
        setPlayers(response.players);
        setGameState('waiting');
        addSystemMessage(`Комната создана! Код: ${response.roomCode}`);
      } else {
        setError(response.error);
      }
    });
  }, []);

  // Присоединение к комнате
  const joinRoom = useCallback((roomCode, playerName) => {
    setIsLoading(true);
    setError(null);

    socket.current.emit('joinRoom', roomCode, playerName, (response) => {
      setIsLoading(false);

      if (response.success) {
        setRoomCode(roomCode);
        setPlayerId(response.playerId);
        setPlayers(response.players);
        setGameState('waiting');
        addSystemMessage(`Вы присоединились к комнате ${roomCode}`);
      } else {
        setError(response.error);
      }
    });
  }, []);

  // Начало игры
  const startGame = useCallback(() => {
    if (!roomCode) return;

    socket.current.emit('startGame', roomCode, (response) => {
      if (!response.success) {
        setError(response.error);
      }
    });
  }, [roomCode]);

  // Ночное действие
  const performNightAction = useCallback((targetPlayerId) => {
    if (!roomCode || !playerId) return;

    socket.current.emit('nightAction', roomCode, targetPlayerId, (response) => {
      if (response.success) {
        setSelectedNightTarget(targetPlayerId);
        addSystemMessage('Ваше действие выполнено!');
      } else {
        setError(response.error);
      }
    });
  }, [roomCode, playerId]);

  // Отправка сообщения в чат
  const sendMessage = useCallback((messageText) => {
    if (!roomCode) return;

    socket.current.emit('sendMessage', roomCode, messageText, (response) => {
      if (!response.success) {
        setError(response.error);
      }
    });
  }, [roomCode]);

  // Голосование
  const vote = useCallback((targetPlayerId) => {
    if (!roomCode) return;

    socket.current.emit('vote', roomCode, targetPlayerId, (response) => {
      if (response.success) {
        setSelectedVoteTarget(targetPlayerId);
      } else {
        setError(response.error);
      }
    });
  }, [roomCode]);

  // Получение состояния комнаты
  const getRoomState = useCallback(() => {
    if (!roomCode) return;

    socket.current.emit('getRoomState', roomCode, (response) => {
      if (response.success) {
        setPlayers(response.room.players);
        setGameState(response.room.gameState);
        setCurrentPhase(response.room.currentPhase);
      }
    });
  }, [roomCode]);

  // Отключение от игры
  const disconnect = useCallback(() => {
    setGameState('menu');
    setRoomCode(null);
    setPlayerId(null);
    setPlayers([]);
    setCurrentRole(null);
    setMessages([]);
    setCurrentPhase(null);
    setSelectedNightTarget(null);
    setSelectedVoteTarget(null);
    setMafiaAllies([]);
  }, []);

  return {
    // Состояние
    roomCode,
    playerId,
    players,
    gameState,
    currentPhase,
    currentRole,
    messages,
    error,
    isLoading,
    nightResults,
    selectedNightTarget,
    selectedVoteTarget,
    gameWinner,
    mafiaAllies,

    // Методы
    createRoom,
    joinRoom,
    startGame,
    performNightAction,
    sendMessage,
    vote,
    getRoomState,
    disconnect,
    addSystemMessage,
    setError,
    setMessages,
  };
};
