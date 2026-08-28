const express = require("express");
const router = express.Router();

const {
    createTransaction,
    topUpBalance,
    getAllTransactions,
    getTransactionsByUid
} = require("../controllers/paymentController");

// Parking Payment
router.post("/", createTransaction);

// Top Up Balance
router.post("/topup", topUpBalance);

// Get All Payments
router.get("/", getAllTransactions);

// Get Payment By UID
router.get("/:uid", getTransactionsByUid);

module.exports = router;