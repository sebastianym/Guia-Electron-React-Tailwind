const express = require("express");
const {
  createSale,
  getSales,
  updateSale,
  deleteSale,
} = require("../controllers/saleController");

const router = express.Router();

router.post("/", createSale);
router.get("/", getSales);
router.put("/", updateSale);
router.delete("/", deleteSale);

module.exports = router;
