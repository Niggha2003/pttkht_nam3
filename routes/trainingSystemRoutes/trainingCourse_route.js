const express = require("express");
const router = express.Router();

const trainingCourse_controller = require("../../controllers/trainingSystemControllers/trainingCourse_controller");

/// trainingCourse routes ///

// GET request for creating a trainingCourse. NOTE This must come before routes that display trainingCourse (uses id).
router.get("/create", trainingCourse_controller.trainingCourse_create_get);

// POST request for creating trainingCourse.
router.post("/create", trainingCourse_controller.trainingCourse_create_post);

// GET request to delete trainingCourse.
router.get("/:id/delete", trainingCourse_controller.trainingCourse_delete_get);

// POST request to delete trainingCourse.
router.post("/:id/delete", trainingCourse_controller.trainingCourse_delete_post);

// GET request to update trainingCourse.
router.get("/:id/update", trainingCourse_controller.trainingCourse_update_get);

// POST request to update trainingCourse.
router.post("/:id/update", trainingCourse_controller.trainingCourse_update_post);

// GET request for one trainingCourse.
router.get("/:id", trainingCourse_controller.trainingCourse_detail);

// GET request for list of all trainingCourse items.
router.get("/", trainingCourse_controller.trainingCourse_list);

module.exports = router;