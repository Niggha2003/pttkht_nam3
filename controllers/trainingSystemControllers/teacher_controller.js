const Teacher = require("../../models/trainingSystemModels/teacher");
const asyncHandler = require("express-async-handler");

// Display list of all teachers.
exports.teacher_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher list");
});

// Display detail page for a specific teacher.
exports.teacher_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: teacher detail: ${req.params.id}`);
});

// Display teacher create form on GET.
exports.teacher_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher create GET");
});

// Handle teacher create on POST.
exports.teacher_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher create POST");
});

// Display teacher delete form on GET.
exports.teacher_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher delete GET");
});

// Handle teacher delete on POST.
exports.teacher_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher delete POST");
});

// Display teacher update form on GET.
exports.teacher_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher update GET");
});

// Handle teacher update on POST.
exports.teacher_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher update POST");
});
