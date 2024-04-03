const express = require('express');
const router = express.Router();

const worker_route = require("./worker_route");

router.use("/worker", worker_route);

module.exports = router;