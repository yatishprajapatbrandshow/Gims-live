// create a router for register
const express = require("express");

const router = express.Router();

// Controllers
const { paymentController } = require("../controller");

// Get Payment Pending
router.post("/create", paymentController.createPayment);

// Get Payment Pending
router.get("/get", paymentController.getPayment);

// Get Payment Pending
router.get("/getAll", paymentController.getAllPayment);

module.exports = router;
