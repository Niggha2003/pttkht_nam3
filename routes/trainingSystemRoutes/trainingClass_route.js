const express = require("express");
const router = express.Router();

const trainingClass_controller = require("../../controllers/trainingSystemControllers/trainingClass_controller");

/// trainingClass routes ///

// GET request for creating a trainingClass. NOTE This must come before routes that display trainingClass (uses id).
router.get("/trainingClass/create", trainingClass_controller.trainingClass_create_get);

// POST request for creating trainingClass.
router.post("/trainingClass/create", trainingClass_controller.trainingClass_create_post);

// GET request to delete trainingClass.
router.get("/trainingClass/:id/delete", trainingClass_controller.trainingClass_delete_get);

// POST request to delete trainingClass.
router.post("/trainingClass/:id/delete", trainingClass_controller.trainingClass_delete_post);

// GET request to update trainingClass.
router.get("/trainingClass/:id/update", trainingClass_controller.trainingClass_update_get);

// POST request to update trainingClass.
router.post("/trainingClass/:id/update", trainingClass_controller.trainingClass_update_post);

// GET request for one trainingClass.
router.get("/trainingClass/:id", trainingClass_controller.trainingClass_detail);

// GET request for list of all trainingClass items.
router.get("/trainingClass", trainingClass_controller.trainingClass_list);

module.exports = router;