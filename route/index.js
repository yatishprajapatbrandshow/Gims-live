const registerRouter = require("./register.router");
const loginRouter = require("./login.router");
const otpRouter = require("./otp.router");
const orderRouter = require("./order.router");
const paymentRouter = require("./payment.router");
module.exports = {
  registerRouter,
  otpRouter,
  loginRouter,
  orderRouter,
  paymentRouter,
};
