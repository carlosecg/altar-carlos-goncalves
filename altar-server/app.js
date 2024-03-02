const WebSocket = require('ws');
const http = require('http');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const server = http.createServer();
const websocketServer = new WebSocket.Server({ noServer: true });
const connections = new Map();

websocketServer.on('connection', (websocket) => {
  console.log('New connection established');
  connections.set(websocket, {
    grid: null,
    code: null
  });

  websocket.on('message', (message) => {
    const gridAndChars = generateRandomChars();
    const code = getLiveCodeAlgorithm(gridAndChars.grid, gridAndChars.charsCount);
    connections.get(websocket).grid = gridAndChars.grid;
    connections.get(websocket).code = code;
    console.log(connections.get(websocket));
    websocket.send(JSON.stringify(connections.get(websocket)))
  });

  websocket.on('close', ()=> {
    console.log('Connection closed');
    connections.delete(websocket);
    console.log(connections);
  });

});

server.on('upgrade', (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit('connection', websocket, request);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

function broadcastUpdate(message) {
  connections.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function generateRandomChars() {
  const grid = [];
  const numOfCharsGenerated = {};

  for (let index = 0; index < 10; index++) {
    const rowOfAlpha = [];
    for (let index = 0; index < 10; index++) {
      const generatedChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      /* If letter hasn't been added before, add an entry to the record */
      numOfCharsGenerated[generatedChar] = numOfCharsGenerated[generatedChar] || 0;
      numOfCharsGenerated[generatedChar]++;
      rowOfAlpha.push(generatedChar);
    }
    grid.push(rowOfAlpha);
  }

  return { grid: grid, charsCount: numOfCharsGenerated };
}

function getLiveCodeAlgorithm(grid, numOfCharsGenerated) {
  const utcDateSeconds = new Date().getUTCSeconds();
  /* Add leading zero to seconds */
  const utcDateSecondsFormatted =
    utcDateSeconds < 10 ? `0${utcDateSeconds}` : utcDateSeconds;
  /* Letter coordinates */
  const extractedX = parseInt(utcDateSecondsFormatted.toString().charAt(0));
  const extractedY = parseInt(utcDateSecondsFormatted.toString().charAt(1));
  /* Define algorithm based coordinates [X,Y], [Y,X] */
  const coordinatesObject = { x: extractedX, y: extractedY };
  /* Letters at coordinates */
  const firstLetter = grid[coordinatesObject.y][coordinatesObject.x];
  const secondLetter = grid[coordinatesObject.x][coordinatesObject.y];

  const firstDigit = numOfCharsGenerated[firstLetter];
  const secondtDigit = numOfCharsGenerated[secondLetter];

  return '' + firstDigit + secondtDigit;
}