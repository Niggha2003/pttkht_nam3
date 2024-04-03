const express = require('express');
const router = express.Router();

const flight_route = require("./flight_route");
const order_route = require("./order_route");

router.use("/flight", flight_route);
router.use("/order", order_route);

module.exports = router;