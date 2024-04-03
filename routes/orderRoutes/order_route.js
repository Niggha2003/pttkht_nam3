const express = require("express");
const router = express.Router();

const order_controller = require("../../controllers/orderControllers/order_controller");

/// order routes ///

// GET request for creating a order. NOTE This must come before routes that display order (uses id).
router.get("/create", order_controller.order_create_get);

// POST request for creating order.
router.post("/create", order_controller.order_create_post);

// GET request to delete order.
router.get("/:id/delete", order_controller.order_delete_get);

// POST request to delete order.
router.post("/:id/delete", order_controller.order_delete_post);

// GET request to update order.
router.get("/:id/update", order_controller.order_update_get);

// POST request to update order.
router.post("/:id/update", order_controller.order_update_post);

// GET request for one order.
router.get("/:id", order_controller.order_detail);

// GET request for list of all order items.
router.get("/", order_controller.order_list);

module.exports = router;