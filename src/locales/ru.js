// Все тексты интерфейса на русском языке
export const ru = {
  // Главное меню
  menu: {
    title: '🎭 Мафия',
    subtitle: 'Веб-версия классической игры',
    createRoom: 'Создать комнату',
    joinRoom: 'Присоединиться',
    nameLabel: 'Ваше имя',
    namePlaceholder: 'Введите ваше имя...',
    roomCodeLabel: 'Код комнаты',
    roomCodePlaceholder: 'Например: ABC123',
    play: 'Играть',
    cancel: 'Отмена',
    error: 'Ошибка',
  },

  // Комната ожидания
  room: {
    code: 'Код комнаты',
    players: 'Игроки',
    playersCount: 'Всего игроков',
    startGame: 'Начать игру',
    minPlayers: 'Нужно минимум 4 игрока',
    waitingForPlayers: 'Ожидание игроков...',
    creatorOnly: 'Только создатель может начать игру',
    copyCode: 'Скопировать код',
    copied: 'Код скопирован!',
  },

  // Роли и описания
  roles: {
    mafia: 'Мафиози',
    sheriff: 'Шериф',
    doctor: 'Доктор',
    villager: 'Мирный житель',
    
    mafiaDesc: 'Вы мафиози! Ночью выбирайте жертву для устранения. Днём голосуйте вместе с остальными.',
    sheriffDesc: 'Вы шериф! Ночью проверяйте одного игрока и узнавайте его роль. Результат будет известен только вам.',
    doctorDesc: 'Вы доктор! Ночью спасайте одного игрока (можете спасти и себя) от убийства мафией.',
    villagerDesc: 'Вы мирный житель! Днём обсуждайте и голосуйте за исключение подозреваемого.',
  },

  // Фазы игры
  phases: {
    night: 'Наступила ночь',
    nightMessage: 'Активные роли выполняют свои действия. Остальные спят.',
    day: 'Наступил день',
    dayMessage: 'Начинается обсуждение. Обменивайтесь информацией.',
    voting: 'Голосование',
    votingMessage: 'Выберите игрока для исключения.',
    
    nightAction: 'Ваше действие ночи',
    selectTarget: 'Выберите цель',
    confirmAction: 'Подтвердить',
    actionConfirmed: 'Действие выполнено!',
  },

  // Статусы игроков
  status: {
    alive: 'Жив',
    dead: 'Мертв',
    yourRole: 'Ваша роль',
    unknown: 'Неизвестно',
  },

  // Чат
  chat: {
    title: 'Чат',
    messagePlaceholder: 'Написать сообщение...',
    send: 'Отправить',
    cannotWriteNight: 'Ночью нельзя писать в чат',
    cannotWriteDead: 'Мертвые не могут писать',
    systemMessage: 'Системное сообщение',
    playerJoined: 'присоединился к игре',
    playerLeft: 'покинул игру',
    playerKilled: 'был убит мафией',
    playerHealed: 'был спасен доктором',
    playerEliminated: 'исключен голосованием',
  },

  // Результаты
  results: {
    mafiaWins: '🎭 Победила мафия!',
    villagersWin: '🌟 Победили мирные жители!',
    gameEnd: 'Игра завершена',
    finalStats: 'Финальная статистика',
    playAgain: 'Играть снова',
    backToMenu: 'На главное меню',
  },

  // Кнопки
  buttons: {
    ok: 'ОК',
    close: 'Закрыть',
    submit: 'Отправить',
    skip: 'Пропустить',
    ready: 'Готов',
    disconnect: 'Отключиться',
    copy: 'Скопировать',
  },

  // Ошибки
  errors: {
    connectionFailed: 'Ошибка подключения к серверу',
    roomNotFound: 'Комната не найдена',
    invalidRoomCode: 'Неверный код комнаты',
    roomFull: 'Комната переполнена',
    gameAlreadyStarted: 'Игра уже началась',
    unknownError: 'Неизвестная ошибка',
    disconnected: 'Вы отключились от сервера',
    reconnecting: 'Переподключение...',
  },

  // Уведомления
  notifications: {
    nightEnded: 'Ночь закончилась',
    dayStarted: 'День начался',
    someoneDied: 'Кто-то был убит',
    someoneSaved: 'Кто-то был спасен',
    checkResult: 'Результат проверки получен',
  },
};

export default ru;
