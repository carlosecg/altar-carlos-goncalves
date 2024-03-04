# altar-carlos-goncalves
Coding challenge

# altar-server

Node version v20.11.1

The entire communication between the server and the app is made via websockets with a custom message protocol;
The app must send a stringified JSON with the format { type: MessageType, data: anything }, ex. JSON.stringify({ type: 'gridUpdate', data: {} });
The socket server responds with a { status: HttpStatus data: any }
Create an .env file (if there isn't one) based on the .env.example file in the repo (already contains the correct values);
The socket client along with the generated grid/code are stored into a "connections" Map, where the grid/code are updated server-side and broadcasted to the user (this way the server holds the real grid/code at all times, avoiding client-side manipulation/dependency)
Opted for the app updating the grid/code every second instead of the server, this way the client holds the "load" of clearing/starting intervals

Note: The server could've used a standard HTTP polling or SSE, but i chose to use WebSocket since it was a requirement in one of the bonuses

MessageType:
-GridUpdate => expects data: { character: BIAS_CHAR | null }

# altar-app

Angular version v17.2.2
