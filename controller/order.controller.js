const { Order } = require("../model");
const { userService } = require("../services");
const generateUniqueId = require("../utils/randomSidGenerate.util");

const createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { userid, price, discount, voucher } = req.body;

    // Validate required fields
    const missingFields = []; // Array to hold missing fields
    if (!userid || userid == "" || userid === "undefined")
      missingFields.push("userid");
    if (!price) missingFields.push("price");
    // if (!discount) missingFields.push('discount');
    // if (!voucher) missingFields.push('voucher');

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
        data: false,
      });
    }

    const checkUserExits = await userService.checkIfExits(userid);
    if (!checkUserExits) {
      return res.status(404).json({
        status: false,
        message: "No User Exists with this id",
        data: false,
      });
    }
    const checkAlreadyOrder = await Order.find({
      userid: userid,
      status: true,
    });
    if (checkAlreadyOrder.length > 0) {
      checkAlreadyOrder.forEach(async (order) => {
        if (order.status) {
          order.status = false;
          order.deleteFlag = true;
          try {
            await order.save();
          } catch (error) {
            console.error(`Error saving order with ID ${order.id}:`, error);
          }
        }
      });
    }

    // Generate a unique sid
    const existingOrderIds = await Order.find({}, "sid");
    const existingIds = existingOrderIds.map((order) => order.sid);
    const sid = await generateUniqueId(existingIds);
    // Create a new order using the Mongoose model
    const newOrder = new Order({
      sid,
      userid,
      price,
      discount,
      voucher,
      status: true,
      addedBy: userid,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    if (savedOrder) {
      return res.status(201).json({
        status: true,
        message: "Order created successfully",
        data: savedOrder,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Failed To Create Order",
      data: false,
    });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Error creating order:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
