const express = require("express");
const router = express.Router();

const teacher_controller = require("../../controllers/trainingSystemControllers/teacher_controller");

/// teacher routes ///

// GET request for creating a teacher. NOTE This must come before routes that display teacher (uses id).
router.get("/create", teacher_controller.teacher_create_get);

// POST request for creating teacher.
router.post("/create", teacher_controller.teacher_create_post);

// GET request to delete teacher.
router.get("/:id/delete", teacher_controller.teacher_delete_get);

// POST request to delete teacher.
router.post("/:id/delete", teacher_controller.teacher_delete_post);

// GET request to update teacher.
router.get("/:id/update", teacher_controller.teacher_update_get);

// POST request to update teacher.
router.post("/:id/update", teacher_controller.teacher_update_post);

// GET request for one teacher.
router.get("/:id", teacher_controller.teacher_detail);

// GET request for list of all teacher items.
router.get("/", teacher_controller.teacher_list);

module.exports = router;