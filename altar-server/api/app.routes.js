const express = require("express");
const gridRoutes = express.Router();
const GridService = require("../controllers/grid.service");
const gridService = new GridService();

gridRoutes.get("/grid/:character?", (req, res) => {
  // Response headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("A new connection started");
  const streamId = setInterval(() => {
    try {
      const gridAndChars = gridService.generateRandomChars();

      if (req.params.character) {
        gridService.applyBiasToGrid(
          req.params.character.toUpperCase(),
          gridAndChars.grid,
          gridAndChars.charsCount
        );
      }
  
      const code = gridService.getLiveCodeAlgorithm(
        gridAndChars.grid,
        gridAndChars.charsCount
      );
      res.write(
        `data: ${JSON.stringify({ grid: gridAndChars.grid, code: code })}\n\n`
      );
    } catch (error) {
      console.log('SSE Error:', error);
    }
  }, 1000);

  req.on("close", () => {
    console.log("A connection closed");
    clearInterval(streamId);
  });
});

module.exports = gridRoutes;