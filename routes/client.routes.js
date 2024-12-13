const express = require("express");
const router = express.Router();
const { Client } = require("../models/client.model");
const validate = require("../middlewares/validate");
const { clientSchema } = require("../utils/validation");

router.post("/", validate(clientSchema), async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json(client);
});

router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
});

router.put("/:id", validate(clientSchema), async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json({ message: "Client deleted" });
});

module.exports = router;
