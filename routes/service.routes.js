const express = require("express");
const router = express.Router();
const { Service } = require("../models/service.model");
const validate = require("../middlewares/validate");
const { serviceSchema } = require("../utils/validation");
const { Invoice } = require('../models/invoice.model.js');
const { InvoiceLineItem } = require('../models/invoiceLineItems.model.js');

router.post("/", validate(serviceSchema), async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});



// POST /api/service - Add new service to an existing invoice
router.post('/add', async (req, res) => {

  try {
    const { invoiceNumber, name, fee, hoursDays, amount } = req.body;

    // Validate input
    if (!invoiceNumber || !name || !fee || !hoursDays || !amount) {
      return res.status(400).json({ message: "Invoice Number, Name, Fee, and Hours/Days are required." });
    }

    // Create new service
    const newService = new Service({ name, fee });
    await newService.save();

    // Find the existing invoice using invoiceNumber
    const invoice = await Invoice.findOne({ invoice_number: invoiceNumber });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    // Update the invoice's subtotal and total by adding the new service fee
    invoice.subtotal += fee;
    invoice.total += fee;
    await invoice.save();

    // Create a new invoice line item to link the service to the invoice
    const newLineItem = new InvoiceLineItem({
      invoiceNumber: invoice._id,
      serviceId: newService._id,
      amount: amount,
      hoursDays: hoursDays, // Dynamic hours or days
    });
    await newLineItem.save();

    res.status(201).json({ message: 'Service added to invoice successfully!', service: newService });
  } catch (error) {
    console.error('Error adding service to invoice:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

router.put("/:id", validate(serviceSchema), async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
});

router.delete("/:id", async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Service deleted" });
});

module.exports = router;
