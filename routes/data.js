const express = require("express");
const router = express.Router();

const accountTraining_controller = require("../controllers/accountTrainingController");

/// home page ///

router.get("/", accountTraining_controller.accountTraining_list);

/// account training routes ///

// GET request for creating a Account Training. NOTE This must come before routes that display Account Training (uses id).
router.get("/account_training/create", accountTraining_controller.accountTraining_create_get);

// POST request for creating Account Training.
router.post("/account_training/create", accountTraining_controller.accountTraining_create_post);

// GET request to delete Account Training.
router.get("/account_training/:id/delete", accountTraining_controller.accountTraining_delete_get);

// POST request to delete Account Training.
router.post("/account_training/:id/delete", accountTraining_controller.accountTraining_delete_post);

// GET request to update Account Training.
router.get("/account_training/:id/update", accountTraining_controller.accountTraining_update_get);

// POST request to update Account Training.
router.post("/account_training/:id/update", accountTraining_controller.accountTraining_update_post);

// GET request for one Account Training.
router.get("/account_training/:id", accountTraining_controller.accountTraining_detail);

// GET request for list of all Account Training items.
router.get("/account_training", accountTraining_controller.accountTraining_list);

module.exports = router;