const express = require("express");
const router = express.Router();

const mark_controller = require("../../controllers/trainingSystemControllers/mark_controller");

/// mark routes ///

// GET request for creating a mark. NOTE This must come before routes that display mark (uses id).
router.get("/mark/create", mark_controller.mark_create_get);

// POST request for creating mark.
router.post("/mark/create", mark_controller.mark_create_post);

// GET request to delete mark.
router.get("/mark/:id/delete", mark_controller.mark_delete_get);

// POST request to delete mark.
router.post("/mark/:id/delete", mark_controller.mark_delete_post);

// GET request to update mark.
router.get("/mark/:id/update", mark_controller.mark_update_get);

// POST request to update mark.
router.post("/mark/:id/update", mark_controller.mark_update_post);

// GET request for one mark.
router.get("/mark/:id", mark_controller.mark_detail);

// GET request for list of all mark items.
router.get("/mark", mark_controller.mark_list);

module.exports = router;