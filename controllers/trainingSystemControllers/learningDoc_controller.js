const LearningDoc = require("../../models/trainingSystemModels/learningDoc");
const asyncHandler = require("express-async-handler");

// Display list of all learningDocs.
exports.learningDoc_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc list");
});

// Display detail page for a specific learningDoc.
exports.learningDoc_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: learningDoc detail: ${req.params.id}`);
});

// Display learningDoc create form on GET.
exports.learningDoc_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc create GET");
});

// Handle learningDoc create on POST.
exports.learningDoc_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc create POST");
});

// Display learningDoc delete form on GET.
exports.learningDoc_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc delete GET");
});

// Handle learningDoc delete on POST.
exports.learningDoc_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc delete POST");
});

// Display learningDoc update form on GET.
exports.learningDoc_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc update GET");
});

// Handle learningDoc update on POST.
exports.learningDoc_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc update POST");
});
