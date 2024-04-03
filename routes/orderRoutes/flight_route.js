const express = require("express");
const router = express.Router();

const flight_controller = require("../../controllers/orderControllers/flight_controller");

/// flight routes ///

// GET request for creating a flight. NOTE This must come before routes that display flight (uses id).
router.get("/create", flight_controller.flight_create_get);

// POST request for creating flight.
router.post("/create", flight_controller.flight_create_post);

// GET request to delete flight.
router.get("/:id/delete", flight_controller.flight_delete_get);

// POST request to delete flight.
router.post("/:id/delete", flight_controller.flight_delete_post);

// GET request to update flight.
router.get("/:id/update", flight_controller.flight_update_get);

// POST request to update flight.
router.post("/:id/update", flight_controller.flight_update_post);

// GET request for one flight.
router.get("/:id", flight_controller.flight_detail);

// GET request for list of all flight items.
router.get("/", flight_controller.flight_list);

module.exports = router;