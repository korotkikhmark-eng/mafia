// Компонент чата для игроков
import { useState, useEffect, useRef } from 'react';
import { ru } from '../locales/ru.js';

export const ChatBox = ({ messages, currentPhase, isDead, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const canSendMessage = currentPhase !== 'night' && !isDead;

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 h-96 md:h-full max-h-96 md:max-h-full flex flex-col">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        💬 {ru.chat.title}
      </h2>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Нет сообщений</p>
        ) : (
          messages.map((msg, index) => {
            const isSystem = msg.playerId === 'system';
            return (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  isSystem
                    ? 'bg-yellow-900/30 text-yellow-200 border border-yellow-700'
                    : 'bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">
                    {isSystem ? '🔔 ' + msg.playerName : msg.playerName}
                  </span>
                </div>
                <p className="text-sm text-gray-100 break-words">{msg.message}</p>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Ввод сообщения */}
      {canSendMessage ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={ru.chat.messagePlaceholder}
            maxLength={300}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-lg transition-all"
          >
            ✈️
          </button>
        </div>
      ) : (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-200 text-sm text-center font-semibold">
          {isDead
            ? ru.chat.cannotWriteDead
            : ru.chat.cannotWriteNight}
        </div>
      )}

      {/* Счетчик символов */}
      <p className="text-xs text-gray-500 mt-2 text-right">
        {messageInput.length}/300
      </p>
    </div>
  );
};
