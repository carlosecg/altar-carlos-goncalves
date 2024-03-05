const express = require("express");
const paymentRoutes = express.Router();
const PaymentService = require("../controllers/payment.service");
const paymentService = new PaymentService();

paymentRoutes.get("/payments", (req, res) => {
  try {
    const paymentList = paymentService.getPayments();
    res.status(200).send(paymentList);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

paymentRoutes.post("/payments", (req, res) => {
  if (req.body && req.body.name && req.body.amount && req.body.code) {
    paymentService.addPayment(req.body);
    res.status(200).send({ message: "OK" });
  } else {
    res.status(400).send({ message: "Bad request" });
  }
});

module.exports = paymentRoutes;
