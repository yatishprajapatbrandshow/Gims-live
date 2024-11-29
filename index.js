// index.js
require("dotenv").config();
// cons = require("./middlewares/Auth");
const express = require("express");
const db = require("./mongoConnection");
const app = express();
const cors = require("cors");
// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const { loginRouter, registerRouter, otpRouter, orderRouter, paymentRouter } = require("./route");

// Register Route
app.use("/api/register", registerRouter);

// login Routes
app.use("/api/login", loginRouter);

// OTP Routes
app.use("/api/otp", otpRouter);

// Order Routes
app.use("/api/order", orderRouter);

// payment Routes
app.use("/api/payment", paymentRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at Port:${port}`);
});
