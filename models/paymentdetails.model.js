const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema({
  account_holder: String,
  bank_name: String,
  account_number: String,
  IBAN: String,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);

module.exports = {
  PaymentDetails,
};
