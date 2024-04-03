const express = require("express");
const router = express.Router();

const apply_controller = require("../../controllers/signingControllers/apply_controller");

/// apply routes ///

// GET request for creating a apply. NOTE This must come before routes that display apply (uses id).
router.get("/apply/create", apply_controller.apply_create_get);

// POST request for creating apply.
router.post("/apply/create", apply_controller.apply_create_post);

// GET request to delete apply.
router.get("/apply/:id/delete", apply_controller.apply_delete_get);

// POST request to delete apply.
router.post("/apply/:id/delete", apply_controller.apply_delete_post);

// GET request to update apply.
router.get("/apply/:id/update", apply_controller.apply_update_get);

// POST request to update apply.
router.post("/apply/:id/update", apply_controller.apply_update_post);

// GET request for one apply.
router.get("/apply/:id", apply_controller.apply_detail);

// GET request for list of all apply items.
router.get("/apply", apply_controller.apply_list);

module.exports = router;