const Subject = require("../../models/trainingSystemModels/subject");
const asyncHandler = require("express-async-handler");

// Display list of all subjects.
exports.subject_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject list");
});

// Display detail page for a specific subject.
exports.subject_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: subject detail: ${req.params.id}`);
});

// Display subject create form on GET.
exports.subject_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject create GET");
});

// Handle subject create on POST.
exports.subject_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject create POST");
});

// Display subject delete form on GET.
exports.subject_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject delete GET");
});

// Handle subject delete on POST.
exports.subject_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject delete POST");
});

// Display subject update form on GET.
exports.subject_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject update GET");
});

// Handle subject update on POST.
exports.subject_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject update POST");
});
