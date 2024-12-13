const express = require("express");
const router = express.Router();
const { Service } = require("../models/service.model");
const validate = require("../middlewares/validate");
const { serviceSchema } = require("../utils/validation");

router.post("/", validate(serviceSchema), async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
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
