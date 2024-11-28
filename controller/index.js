const registerController = require("./register.controller");
const otpController = require("./otp.controller");
const loginController = require("./login.controller");
const orderController = require("./order.controller");
const paymentController = require("./Payment.controller");
module.exports = {
  registerController,
  loginController,
  otpController,
  orderController,
  paymentController
};
