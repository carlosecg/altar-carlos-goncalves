const WebSocket = require("ws");
const http = require("http");
const { generateRandomChars, applyBiasToGrid, getLiveCodeAlgorithm } = require("./controllers/grid.service")

const server = http.createServer();
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3000;
const websocketServer = new WebSocket.Server({ port: WEBSOCKET_PORT });
const connections = new Map();

websocketServer.on("connection", (websocket) => {
  console.log("New connection established");
  connections.set(websocket, {
    grid: null,
    code: null,
  });

  websocket.on("message", (message) => {
    const gridAndChars = generateRandomChars();
    applyBiasToGrid("A", gridAndChars.grid, gridAndChars.charsCount);
    const code = getLiveCodeAlgorithm(
      gridAndChars.grid,
      gridAndChars.charsCount
    );
    connections.get(websocket).grid = gridAndChars.grid;
    connections.get(websocket).code = code;
    websocket.send(JSON.stringify(connections.get(websocket)));
  });

  websocket.on("close", () => {
    console.log("Connection closed");
    connections.delete(websocket);
    console.log(connections);
  });
});

server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit("connection", websocket, request);
  });
});

// server.listen(WEBSOCKET_PORT, () => {
//   console.log(`Websocket server is listening on port ${WEBSOCKET_PORT}`);
// });

function broadcastUpdate(message) {
  connections.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
