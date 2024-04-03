const express = require("express");
const router = express.Router();

const worker_controller = require("../../controllers/trainingSystemControllers/worker_controller");

/// worker routes ///

// GET request for creating a worker. NOTE This must come before routes that display worker (uses id).
router.get("/worker/create", worker_controller.worker_create_get);

// POST request for creating worker.
router.post("/worker/create", worker_controller.worker_create_post);

// GET request to delete worker.
router.get("/worker/:id/delete", worker_controller.worker_delete_get);

// POST request to delete worker.
router.post("/worker/:id/delete", worker_controller.worker_delete_post);

// GET request to update worker.
router.get("/worker/:id/update", worker_controller.worker_update_get);

// POST request to update worker.
router.post("/worker/:id/update", worker_controller.worker_update_post);

// GET request for one worker.
router.get("/worker/:id", worker_controller.worker_detail);

// GET request for list of all worker items.
router.get("/worker", worker_controller.worker_list);

module.exports = router;