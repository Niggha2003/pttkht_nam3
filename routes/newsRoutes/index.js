const express = require("express");
const router = express.Router();

const news_route = require("./news_route");

router.use("/", news_route);

module.exports = router;