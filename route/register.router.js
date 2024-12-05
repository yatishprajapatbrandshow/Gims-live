// create a router for register
const express = require("express");

const router = express.Router();

// Controllers
const { registerController } = require("../controller");

// register user 
router.post("/", registerController.register);

// update user
router.post("/update", registerController.updateUser);

// Get User
router.get("/get", registerController.getUser);
// Get User
router.get("/search", registerController.search);

// Get Users
router.get("/getAll", registerController.getUsers);

module.exports = router;