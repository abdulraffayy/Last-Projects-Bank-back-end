const mongoose = require('mongoose');

const invoiceLineItemSchema = new mongoose.Schema({
  invoiceNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  hoursDays: Number,
  amount: Number,
});


const InvoiceLineItem = mongoose.model('InvoiceLineItem', invoiceLineItemSchema);

module.exports = {
  InvoiceLineItem,
};
