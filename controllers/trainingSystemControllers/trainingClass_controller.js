const TrainingClass = require("../../models/trainingSystemModels/trainingClass");
const asyncHandler = require("express-async-handler");

// Display list of all trainingClasss.
exports.trainingClass_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass list");
});

// Display detail page for a specific trainingClass.
exports.trainingClass_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: trainingClass detail: ${req.params.id}`);
});

// Display trainingClass create form on GET.
exports.trainingClass_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass create GET");
});

// Handle trainingClass create on POST.
exports.trainingClass_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass create POST");
});

// Display trainingClass delete form on GET.
exports.trainingClass_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass delete GET");
});

// Handle trainingClass delete on POST.
exports.trainingClass_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass delete POST");
});

// Display trainingClass update form on GET.
exports.trainingClass_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass update GET");
});

// Handle trainingClass update on POST.
exports.trainingClass_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass update POST");
});
