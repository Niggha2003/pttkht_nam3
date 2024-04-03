const express = require("express");
const router = express.Router();

const accountTraining_controller = require("../../controllers/accountControllers/accountTraining_controller");
const accountEmployee_controller = require("../../controllers/accountControllers/accountEmployee_controller");

/// account training routes ///

// GET request for creating a account training. NOTE This must come before routes that display account training (uses id).
router.get("/account_training/create", accountTraining_controller.accountTraining_create_get);

// POST request for creating account training.
router.post("/account_training/create", accountTraining_controller.accountTraining_create_post);

// GET request to delete account training.
router.get("/account_training/:id/delete", accountTraining_controller.accountTraining_delete_get);

// POST request to delete account training.
router.post("/account_training/:id/delete", accountTraining_controller.accountTraining_delete_post);

// GET request to update account training.
router.get("/account_training/:id/update", accountTraining_controller.accountTraining_update_get);

// POST request to update account training.
router.post("/account_training/:id/update", accountTraining_controller.accountTraining_update_post);

// GET request for one account training.
router.get("/account_training/:id", accountTraining_controller.accountTraining_detail);

// GET request for list of all account training items.
router.get("/account_training", accountTraining_controller.accountTraining_list);

/// account employee routes ///

// GET request for creating a account employee. NOTE This must come before routes that display account employee (uses id).
router.get("/account_employee/create", accountEmployee_controller.accountEmployee_create_get);

// POST request for creating account employee.
router.post("/account_employee/create", accountEmployee_controller.accountEmployee_create_post);

// GET request to delete account employee.
router.get("/account_employee/:id/delete", accountEmployee_controller.accountEmployee_delete_get);

// POST request to delete account employee.
router.post("/account_employee/:id/delete", accountEmployee_controller.accountEmployee_delete_post);

// GET request to update account employee.
router.get("/account_employee/:id/update", accountEmployee_controller.accountEmployee_update_get);

// POST request to update account employee.
router.post("/account_employee/:id/update", accountEmployee_controller.accountEmployee_update_post);

// GET request for one account employee.
router.get("/account_employee/:id", accountEmployee_controller.accountEmployee_detail);

// GET request for list of all account employee items.
router.get("/account_employee", accountEmployee_controller.accountEmployee_list);

module.exports = router;