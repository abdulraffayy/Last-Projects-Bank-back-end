const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoice_number: String,
  date_of_issue: Date,
  due_date: Date,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  subtotal: Number,
  total: Number,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = {
  Invoice,
};
