const TrainingCourse = require("../../models/trainingSystemModels/trainingCourse");
const asyncHandler = require("express-async-handler");

// Display list of all trainingCourses.
exports.trainingCourse_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse list");
});

// Display detail page for a specific trainingCourse.
exports.trainingCourse_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: trainingCourse detail: ${req.params.id}`);
});

// Display trainingCourse create form on GET.
exports.trainingCourse_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse create GET");
});

// Handle trainingCourse create on POST.
exports.trainingCourse_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse create POST");
});

// Display trainingCourse delete form on GET.
exports.trainingCourse_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse delete GET");
});

// Handle trainingCourse delete on POST.
exports.trainingCourse_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse delete POST");
});

// Display trainingCourse update form on GET.
exports.trainingCourse_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse update GET");
});

// Handle trainingCourse update on POST.
exports.trainingCourse_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse update POST");
});
