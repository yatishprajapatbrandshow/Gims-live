const { Order, Payment } = require("../model");
const { userService } = require("../services");
const generateUniqueId = require("../utils/randomSidGenerate.util");

const createPayment = async (req, res) => {
  try {
    const {
      userId,
      orderid,
      razorpayId,
      paidAmount,
      currency,
      tracking_id,
      bank_ref_no,
      order_status,
      failure_message,
      payment_mode,
      status_code,
      status_message,
      trans_date,
    } = req.body;

    // Validate required fields
    const missingFields = []; // Array to hold missing fields
    if (!userId || userId == "" || userId === "undefined")
      missingFields.push("userId");
    if (!orderid) missingFields.push("orderid");
    if (!razorpayId) missingFields.push("razorpayId");
    if (!paidAmount) missingFields.push("paidAmount");
    if (!currency) missingFields.push("currency");
    if (!order_status) missingFields.push("order_status");
    if (!payment_mode) missingFields.push("payment_mode");
    if (!trans_date) missingFields.push("trans_date");

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
        data: false,
      });
    }
    const checkUserExits = await userService.checkIfExits(userId);
    if (!checkUserExits) {
      return res.status(404).json({
        status: false,
        message: "No User Exists with this id",
        data: false,
      });
    }

    const orderExits = await Order.findOne({
      sid: orderid,
      userid: userId,
      status: true,
      deleteFlag: false,
      payementStatus: "Pending",
    });

    if (!orderExits) {
      return res.status(404).json({
        status: false,
        message: "Order id is not valid ",
        data: false,
      });
    }

    const alreadyExists = await Payment.find({
      orderid,
      status: "Active",
      order_status: "Success",
      deleteflag: false,
    });

    if (alreadyExists.length !== 0) {
      return res.status(404).json({
        status: false,
        message: "Payment Already Done for this OrderId",
        data: false,
      });
    }
    // Generate a unique sid
    const existingPayment = await Payment.find({}, "sid"); // Fetch all existing sids
    const existingIds = existingPayment.map((activity) => activity.sid);
    const sid = await generateUniqueId(existingIds);

    const newPayment = new Payment({
      sid,
      orderid,
      razorpayId,
      paidAmount,
      currency,
      tracking_id,
      bank_ref_no,
      order_status,
      failure_message,
      payment_mode,
      status_code,
      status_message,
      trans_date,
      status: "Active",
    });
    const savedPayment = await newPayment.save();

    if (savedPayment) {
      orderExits.payementStatus = "Completed";
      orderExits.paymentId = savedPayment.sid;
      await orderExits.save();
      return res.status(201).json({
        status: true,
        message: "New Payment Created Successfully",
        data: savedPayment,
      });
    }
    return res.status(404).json({
      status: false,
      message: "Failed to create Payment",
      data: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: false,
    });
  }
};
const getPayment = async (req, res) => {
  try {
    const { userId } = req.query;
    const checkUserExits = await userService.checkIfExits(userId);
    if (!checkUserExits) {
      return res.status(404).json({
        status: false,
        message: "No User Exists with this id",
        data: false,
      });
    }
    const paymentDetails = await Payment.find({
      status: "Active",
      deleteflag: false,
    });
    if (paymentDetails.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Payment Details Found",
        data: false,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Payment Details Found",
      data: paymentDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: false,
    });
  }
};
const getAllPayment = async (req, res) => {
  try {
    const paymentDetails = await Payment.find({
      status: "Active",
      deleteflag: false,
    });
    if (paymentDetails.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Payment Details Found",
        data: false,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Payment Details Found",
      data: paymentDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: false,
    });
  }
};
module.exports = {
  createPayment,
  getPayment,
  getAllPayment
};
