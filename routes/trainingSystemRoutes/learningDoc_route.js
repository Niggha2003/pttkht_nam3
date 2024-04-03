const express = require("express");
const router = express.Router();

const learningDoc_controller = require("../../controllers/trainingSystemControllers/learningDoc_controller");

/// learningDoc routes ///

// GET request for creating a learningDoc. NOTE This must come before routes that display learningDoc (uses id).
router.get("/create", learningDoc_controller.learningDoc_create_get);

// POST request for creating learningDoc.
router.post("/create", learningDoc_controller.learningDoc_create_post);

// GET request to delete learningDoc.
router.get("/:id/delete", learningDoc_controller.learningDoc_delete_get);

// POST request to delete learningDoc.
router.post("/:id/delete", learningDoc_controller.learningDoc_delete_post);

// GET request to update learningDoc.
router.get("/:id/update", learningDoc_controller.learningDoc_update_get);

// POST request to update learningDoc.
router.post("/:id/update", learningDoc_controller.learningDoc_update_post);

// GET request for one learningDoc.
router.get("/:id", learningDoc_controller.learningDoc_detail);

// GET request for list of all learningDoc items.
router.get("/", learningDoc_controller.learningDoc_list);

module.exports = router;