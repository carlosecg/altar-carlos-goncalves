const fs = require('fs');

class ValidationError extends Error {
    constructor(status, message) {
      super(message);
      this.name = 'ValidationError';
      this.status = status || 400;
    }
  }

  const handleError = (statusCode = 500, message = 'Internal server error', res = null) => {
    fs.appendFile('error.log', `${statusCode}: ${message}\n`, (message) => {
      if (message) console.error(statusCode + ',' + message);
    });

    if(res) {
      res.status(statusCode).send(message);
    }
  };
  
  module.exports = {
    ValidationError,
    handleError
  };