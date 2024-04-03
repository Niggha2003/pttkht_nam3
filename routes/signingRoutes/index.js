const express = require('express');
const router = express.Router();

const apply_route = require("./apply_route");

router.use("/apply", apply_route); 

module.exports = router;