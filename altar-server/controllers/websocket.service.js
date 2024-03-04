const WebSocket = require("ws");
const GridService = require("./grid.service");
const gridService = new GridService();
const connections = new Map();

const MessageType = {
  GridUpdate: "gridUpdate",
};

class WebSocketService {

  createSocketServer() {
    const websocketServer = new WebSocket.Server({
      port: process.env.WEBSOCKET_PORT || 3000,
    });
    websocketServer.on("connection", (websocket) => {
      console.log("New connection established");
      connections.set(websocket, {
        grid: null,
        code: null,
      });

      websocket.on("message", (message) => {
        this.processSocketMessage(websocket, message);
      });

      websocket.on("error", (message) => {
        websocket.close();
      });

      websocket.on("close", () => {
        console.log("Connection closed");
        connections.delete(websocket);
        console.log(connections);
      });
    });
  }

  broadcastUpdate(message) {
    connections.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  processSocketMessage(websocket, messageString) {
    let messageObject;
    try {
      messageObject = JSON.parse(messageString);
    } catch (error) {
      console.log("Invalid JSON message", messageString);
      websocket.send(JSON.stringify({ status: 400, data: { error: 'Bad request' } }));
      return;
    }

    switch (messageObject.type) {
      case MessageType.GridUpdate:
        const gridAndChars = gridService.generateRandomChars();

        if(messageObject.data.character) {
          gridService.applyBiasToGrid(messageObject.data.character.toUpperCase(), gridAndChars.grid, gridAndChars.charsCount);
        }

        const code = gridService.getLiveCodeAlgorithm(
          gridAndChars.grid,
          gridAndChars.charsCount
        );
        connections.get(websocket).grid = gridAndChars.grid;
        connections.get(websocket).code = code;
        websocket.send(JSON.stringify({ status: 200, data: connections.get(websocket) }));
        break;

      default:
        break;
    }
  }
}

module.exports = WebSocketService;