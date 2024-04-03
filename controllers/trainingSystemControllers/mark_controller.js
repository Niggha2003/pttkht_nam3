const Mark = require("../../models/trainingSystemModels/mark");
const asyncHandler = require("express-async-handler");

// Display list of all marks.
exports.mark_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark list");
});

// Display detail page for a specific mark.
exports.mark_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: mark detail: ${req.params.id}`);
});

// Display mark create form on GET.
exports.mark_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark create GET");
});

// Handle mark create on POST.
exports.mark_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark create POST");
});

// Display mark delete form on GET.
exports.mark_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark delete GET");
});

// Handle mark delete on POST.
exports.mark_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark delete POST");
});

// Display mark update form on GET.
exports.mark_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark update GET");
});

// Handle mark update on POST.
exports.mark_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark update POST");
});
