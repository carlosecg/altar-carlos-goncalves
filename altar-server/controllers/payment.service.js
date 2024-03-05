const path = require("path");
const MockDatabase = require("./database.service");
const mockDatabase = new MockDatabase(path.join("database", "data.json"));

class PaymentService {
  addPayment(payment) {
    try {
      const paymentList = mockDatabase.readData() || [];
      paymentList.push(payment);
      mockDatabase.writeData(paymentList);
      return true;
    } catch (error) {
      /* Needs proper error handling */
      console.log("Error from adding payment", error);
      return false;
    }
  }

  getPayments() {
    try {
      const paymentList = mockDatabase.readData();
      return paymentList || [];
    } catch (error) {
      /* Needs proper error handling */
      console.log(error);
      return [];
    }
  }
}

module.exports = PaymentService;
