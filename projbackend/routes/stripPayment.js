const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { processPayment } = require("../controllers/stripePayment");

router.post("/stripepayment", processPayment);

module.exports = router;
