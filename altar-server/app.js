require('dotenv').config();
const http = require("http");
const WebSocketService = require('./controllers/websocket.service');
const webSocketService = new WebSocketService();

const server = http.createServer();

webSocketService.createSocketServer();

// server.on("upgrade", (request, socket, head) => {
//   websocketServer.handleUpgrade(request, socket, head, (websocket) => {
//     websocketServer.emit("connection", websocket, request);
//   });
// });

// server.listen(WEBSOCKET_PORT, () => {
//   console.log(`Websocket server is listening on port ${WEBSOCKET_PORT}`);
// });
