// Socket.IO клиент для подключения к серверу
import { io } from 'socket.io-client';

let socket = null;

// Подключение к серверу
export const connectSocket = (serverUrl = 'http://localhost:3000') => {
  if (socket?.connected) return socket;

  socket = io(serverUrl, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('✅ Подключено к серверу');
  });

  socket.on('disconnect', () => {
    console.log('❌ Отключено от сервера');
  });

  socket.on('error', (error) => {
    console.error('🔴 Ошибка Socket.IO:', error);
  });

  return socket;
};

// Получение сокета
export const getSocket = () => {
  if (!socket) {
    connectSocket();
  }
  return socket;
};

// Проверка подключения
export const isSocketConnected = () => {
  return socket?.connected || false;
};

// Отключение от сервера
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Отправка события на сервер с коллбэком
export const emit = (eventName, ...args) => {
  const socket = getSocket();
  return socket.emit(eventName, ...args);
};

// Прослушивание события с сервера
export const on = (eventName, callback) => {
  const socket = getSocket();
  socket.on(eventName, callback);
  
  // Возвращаем функцию для отписки
  return () => {
    socket.off(eventName, callback);
  };
};

// Одноразовое прослушивание события
export const once = (eventName, callback) => {
  const socket = getSocket();
  socket.once(eventName, callback);
};
