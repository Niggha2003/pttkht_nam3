const Student = require("../../models/trainingSystemModels/student");
const asyncHandler = require("express-async-handler");

// Display list of all students.
exports.student_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student list");
});

// Display detail page for a specific student.
exports.student_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: student detail: ${req.params.id}`);
});

// Display student create form on GET.
exports.student_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student create GET");
});

// Handle student create on POST.
exports.student_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student create POST");
});

// Display student delete form on GET.
exports.student_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student delete GET");
});

// Handle student delete on POST.
exports.student_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student delete POST");
});

// Display student update form on GET.
exports.student_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student update GET");
});

// Handle student update on POST.
exports.student_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student update POST");
});
