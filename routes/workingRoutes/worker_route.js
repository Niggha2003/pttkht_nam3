const express = require("express");
const router = express.Router();

const worker_controller = require("../../controllers/workingControllers/worker_controller");

/// worker routes ///

// GET request for creating a worker. NOTE This must come before routes that display worker (uses id).
router.get("/create", worker_controller.worker_create_get);

// POST request for creating worker.
router.post("/create", worker_controller.worker_create_post);

// GET request to delete worker.
router.get("/:id/delete", worker_controller.worker_delete_get);

// POST request to delete worker.
router.post("/:id/delete", worker_controller.worker_delete_post);

// GET request to update worker.
router.get("/:id/update", worker_controller.worker_update_get);

// POST request to update worker.
router.post("/:id/update", worker_controller.worker_update_post);

// GET request for one worker.
router.get("/:id", worker_controller.worker_detail);

// GET request for list of all worker items.
router.get("/", worker_controller.worker_list);

module.exports = router;