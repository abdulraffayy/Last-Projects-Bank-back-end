const express = require("express");
const router = express.Router();
const { InvoiceLineItem } = require("../models/invoiceLineItems.model");
const validate = require("../middlewares/validate");
const { invoiceLineItemSchema } = require("../utils/validation");

router.post("/", validate(invoiceLineItemSchema), async (req, res) => {
  const lineItem = await InvoiceLineItem.create(req.body);
  res.status(201).json(lineItem);
});

router.get("/", async (req, res) => {
  const lineItems = await InvoiceLineItem.find()
    .populate("serviceId")
    .populate("invoiceNumber");
  res.json(lineItems);
});

router.get("/", async (req, res) => {
  const { invoiceId } = req.query;
  if (!invoiceId) {
    return res.status(400).json({ message: "Invoice ID is required" });
  }

  const lineItems = await InvoiceLineItem.find({
    invoiceNumber: invoiceId,
  }).populate("serviceId");
  res.json(lineItems);
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  const lineItem = await InvoiceLineItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!lineItem)
    return res.status(404).json({ message: "Line item not found" });

  const newItem = await InvoiceLineItem.findById(req.params.id);
  (await newItem.populate("serviceId")).populate("invoiceNumber");

  res.json(newItem);
});

router.delete("/:id", async (req, res) => {
  const lineItem = await InvoiceLineItem.findByIdAndDelete(req.params.id);
  if (!lineItem)
    return res.status(404).json({ message: "Line item not found" });
  res.json({ message: "Line item deleted" });
});

module.exports = router;
