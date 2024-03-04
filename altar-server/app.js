require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const gridRoutes = require('./api/app.routes');

app.use(cors())
app.use(gridRoutes);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT || 3000}`);
});
