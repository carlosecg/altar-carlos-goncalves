const { findLowestInteger } = require("../helpers/utils");

class GridService {
  
 generateRandomChars() {
  const grid = [];
  const numOfCharsGenerated = {};
  const alphabet = process.env.GRID_ALPHABET || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let index = 0; index < 10; index++) {
    const rowOfAlpha = [];
    for (let index = 0; index < 10; index++) {
      const generatedChar = alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );
      /* If letter hasn't been added before, add an entry to the record */
      numOfCharsGenerated[generatedChar] = numOfCharsGenerated[generatedChar] || 0;
      numOfCharsGenerated[generatedChar]++;
      rowOfAlpha.push(generatedChar);
    }
    grid.push(rowOfAlpha);
  }
  return { grid: grid, charsCount: numOfCharsGenerated };
}

 applyBiasToGrid(biasChar, grid, totalCharsInGrid, biasAmount = process.env.BIAS_AMOUNT || 20) {
  /* Takes into consideration that the grid might already have some x amount of the bias character
      subtracting the 20 (20% of 100) by the current number of bias chars in the grid */
  let totalOfBiasChars = totalCharsInGrid[biasChar.toUpperCase()];

  while (totalOfBiasChars < biasAmount) {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);

    /* Prevents the algorithm from replacing an already matching coordinate */
    if (grid[randomX][randomY].toUpperCase() != biasChar.toUpperCase()) {
      /* Update number of chars registered in count hash table */
      totalCharsInGrid[biasChar]++;
      /* Decrease the replaced letter */
      if(totalCharsInGrid[grid[randomX][randomY]]) {
        totalCharsInGrid[grid[randomX][randomY]]--;
      } 
      grid[randomX][randomY] = biasChar;
      totalOfBiasChars++;
    }
  }
}

 getLiveCodeAlgorithm(grid, numOfCharsGenerated) {
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

  /* Only apply the findlowestInteger function if number higher than 9 */
  const firstDigit = numOfCharsGenerated[firstLetter] < 9 ? numOfCharsGenerated[firstLetter] : findLowestInteger(numOfCharsGenerated[firstLetter]);
  const secondDigit = numOfCharsGenerated[secondLetter] < 9 ? numOfCharsGenerated[secondLetter] : findLowestInteger(numOfCharsGenerated[secondLetter]);

  return "" + firstDigit + secondDigit;
}

}

module.exports = GridService;
