# altar-carlos-goncalves
Coding challenge

# altar-server

Node version v20.11.1

The server is using Server-Side Events to communicate in intervals of 1 second with the app (after the endpoint has been called)
Create an .env file (if there isn't one) based on the .env.example file in the repo (already contains the correct values);
Bias value, lowest divisor integer and alphabet can be changed in the .env file, the project is prepared to deal with those changes accordingly

# altar-app

Angular version v17.2.2

To initialize the grid, press "Generate 2D Grid" for the first time (You can insert a bias character from the start).
Everytime a bias character is changed, a 4 second timeout is applied to the character input and grid generate button.
To stop the EventSource, press the Stop button