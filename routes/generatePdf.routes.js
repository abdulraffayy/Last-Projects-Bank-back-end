const express = require("express");
const router = express.Router();



router.post("/", async (req, res) => {
  const {client, invoice,} = req.body;
});


module.exports = router;