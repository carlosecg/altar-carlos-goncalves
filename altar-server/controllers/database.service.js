const fs = require("fs");
const path = require("path");

class MockDatabase {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readData() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading data:", error.message);
      return null;
    }
  }

  writeData(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.promises.writeFile(this.filePath, jsonData, "utf-8");
    } catch (error) {
      console.error("Error writing data:", error.message);
    }
  }
}

module.exports = MockDatabase;
