const express = require("express");
const router = express.Router();
const { Organization } = require("../models/organization.model");
const validate = require("../middlewares/validate");
const { organizationSchema } = require("../utils/validation");

router.post("/", validate(organizationSchema), async (req, res) => {
  const organization = await Organization.create(req.body);
  res.status(201).json(organization);
});

router.get("/", async (req, res) => {
  const organizations = await Organization.find();
  res.json(organizations);
});

router.get("/:id", async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  if (!organization)
    return res.status(404).json({ message: "Organization not found" });
  res.json(organization);
});

router.put("/:id", validate(organizationSchema), async (req, res) => {
  const organization = await Organization.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!organization)
    return res.status(404).json({ message: "Organization not found" });
  res.json(organization);
});

router.delete("/:id", async (req, res) => {
  const organization = await Organization.findByIdAndDelete(req.params.id);
  if (!organization)
    return res.status(404).json({ message: "Organization not found" });
  res.json({ message: "Organization deleted" });
});

module.exports = router;
