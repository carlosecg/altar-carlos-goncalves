# altar-carlos-goncalves
Coding challenge

# altar-server

Node version v20.11.1

The server is using Server-Side Events to communicate in intervals of 1 second with the app (after the endpoint has been called)
Create an .env file (if there isn't one) based on the .env.example file in the repo (already contains the correct values);
Bias value, lowest divisor integer and alphabet can be changed in the .env file, the project is prepared to deal with those changes accordingly

To avoid using a database, the payments information is being stored in a database/data.json file.
The data.json file contains all the payments information, including the grid that generated the code.
This can cause the nodemon to "reload" when something is written to that file. To stop this, nodemonConfig has been added in the package.json file!

To run the server:
npm install
node app.js or nodemon app.js

# altar-app

Angular version v17.2.2

To initialize the grid, press "Generate 2D Grid" for the first time (You can insert a bias character from the start).
Everytime a bias character is changed, a 4 second timeout is applied to the character input and grid generate button.
To stop the EventSource, press the Stop button
The bias character is being enforced through regex both in the server-side as the app side
To change the api URL, go to environment.ts (default is http://localhost:3000)

To run the project:
-npm install
-ng serve