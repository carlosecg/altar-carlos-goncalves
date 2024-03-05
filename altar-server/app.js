require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const gridRoutes = require('./api/app.routes');
const paymentRoutes = require('./api/payment.routes');

app.use(cors());
app.use(express.json());
app.use(gridRoutes);
app.use(paymentRoutes);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT || 3000}`);
});
