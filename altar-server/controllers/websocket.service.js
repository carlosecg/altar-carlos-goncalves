const WebSocket = require("ws");
const connections = new Map();

function createSocketServer() {
  const websocketServer = new WebSocket.Server({ noServer: true });
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
}
