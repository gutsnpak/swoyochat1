Добро пожаловать в мое первое приложение на Angular - SWOYOCHAT!
Здесь будут шаги по его установке
1.скопируйте ссылку на репозиторий в терминал
git clone https://github.com/gutsnpak/swoyochat.git

2.убедитесь что вы в нужной директории 
cd swoyochat

3. установите npm пакеты
npm install

4.создайте websocket сервер , чтобы поддерживать общение в реальном времени
назовите файл server.js и вставьте данный код

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
server.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
console.log('WebSocket server is running on ws://localhost:8080');


5.установите библиотеку websocket
npm install ws

6.запустите сервер
node server.js

7.запустите Angular приложение 
ng serve

8.откройте браузер и перейдите по адресу
 http://localhost:4200

работа с приложением
1. введите имя пользователя
2. нажмите кнопки login
3. вводите ссобщение в строку и нажимайте send

https://github.com/gutsnpak/swoyochat.git
