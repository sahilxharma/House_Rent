const express = require("express");
const router = express.Router();
const propertySchema = require("../schemas/propertyModel");

// ✅ Public: fetch all properties without login
router.get("/public", async (req, res) => {
  try {
    const properties = await propertySchema.find({});
    res.status(200).send({
      success: true,
      message: "Public property list",
      data: properties
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch properties",
      error: error.message
    });
  }
});

module.exports = router;
