const express = require("express");
const router = express.Router();

const account_route = require("./account__route");

router.use("/", account_route);

module.exports = router;