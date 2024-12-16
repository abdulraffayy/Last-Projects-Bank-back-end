const express = require("express");
const router = express.Router();
const { Invoice } = require("../models/invoice.model");
const { InvoiceLineItem } = require("../models/invoiceLineItems.model");
const validate = require("../middlewares/validate");
const { invoiceSchema } = require("../utils/validation");

router.post("/", validate(invoiceSchema), async (req, res) => {
  const {
    date_of_issue,
    due_date,
    clientId,
    organizationId,
    subtotal,
    total,
    lineItems,
  } = req.body;

  const count = await Invoice.countDocuments(); 
  const invoice_number = `INV-${count + 1}`;

  const invoice = await Invoice.create({
    invoice_number,
    date_of_issue,
    due_date,
    clientId,
    organizationId,
    subtotal,
    total,
  });

  for (const item of lineItems) {
    await InvoiceLineItem.create({
      invoiceNumber: invoice._id,
      serviceId: item.serviceId,
      hoursDays: item.hoursDays,
      amount: item.amount,
    });
  }

  res.status(201).json(invoice);
});

router.get("/", async (req, res) => {
  const invoices = await Invoice.find()
    .populate("clientId")
    .populate("organizationId");
  res.json(invoices);
});

router.get("/:id", async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate("clientId")
    .populate("organizationId");
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  res.json(invoice);
});

router.delete("/:id", async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  res.json({ message: "Invoice deleted" });
});

module.exports = router;
