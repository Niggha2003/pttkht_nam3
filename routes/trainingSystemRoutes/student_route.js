const express = require("express");
const router = express.Router();

const student_controller = require("../../controllers/trainingSystemControllers/student_controller");

/// student routes ///

// GET request for creating a student. NOTE This must come before routes that display student (uses id).
router.get("/create", student_controller.student_create_get);

// POST request for creating student.
router.post("/create", student_controller.student_create_post);

// GET request to delete student.
router.get("/:id/delete", student_controller.student_delete_get);

// POST request to delete student.
router.post("/:id/delete", student_controller.student_delete_post);

// GET request to update student.
router.get("/:id/update", student_controller.student_update_get);

// POST request to update student.
router.post("/:id/update", student_controller.student_update_post);

// GET request for one student.
router.get("/:id", student_controller.student_detail);

// GET request for list of all student items.
router.get("/", student_controller.student_list);

module.exports = router;