const express = require("express");
const router = express.Router();

const subject_controller = require("../../controllers/trainingSystemControllers/subject_controller");

/// subject routes ///

// GET request for creating a subject. NOTE This must come before routes that display subject (uses id).
router.get("/create", subject_controller.subject_create_get);

// POST request for creating subject.
router.post("/create", subject_controller.subject_create_post);

// GET request to delete subject.
router.get("/:id/delete", subject_controller.subject_delete_get);

// POST request to delete subject.
router.post("/:id/delete", subject_controller.subject_delete_post);

// GET request to update subject.
router.get("/:id/update", subject_controller.subject_update_get);

// POST request to update subject.
router.post("/:id/update", subject_controller.subject_update_post);

// GET request for one subject.
router.get("/:id", subject_controller.subject_detail);

// GET request for list of all subject items.
router.get("/", subject_controller.subject_list);

module.exports = router;