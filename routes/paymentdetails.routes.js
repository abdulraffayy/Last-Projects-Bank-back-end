const express = require("express");
const router = express.Router();
const { PaymentDetails } = require("../models/paymentdetails.model");
const validate = require("../middlewares/validate");
const { paymentDetailsSchema } = require("../utils/validation");

router.post("/", validate(paymentDetailsSchema), async (req, res) => {
  const paymentDetails = await PaymentDetails.create(req.body);
  res.status(201).json(paymentDetails);
});

router.get("/", async (req, res) => {
  const { clientId } = req.query;

  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  try {
    const paymentDetails = await PaymentDetails.find({ clientId });
    console.log("paymentDetails: ", paymentDetails);
    res.json(paymentDetails);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const paymentDetails = await PaymentDetails.find();
  res.json(paymentDetails);
});


module.exports = router;
