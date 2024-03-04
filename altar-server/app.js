require('dotenv').config();
const http = require("http");
const WebSocketService = require('./controllers/websocket.service');
const webSocketService = new WebSocketService();

const server = http.createServer();
webSocketService.createSocketServer();

