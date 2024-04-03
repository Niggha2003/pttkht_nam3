const Worker = require("../../models/trainingSystemModels/worker");
const asyncHandler = require("express-async-handler");

// Display list of all workers.
exports.worker_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker list");
});

// Display detail page for a specific worker.
exports.worker_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: worker detail: ${req.params.id}`);
});

// Display worker create form on GET.
exports.worker_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker create GET");
});

// Handle worker create on POST.
exports.worker_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker create POST");
});

// Display worker delete form on GET.
exports.worker_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker delete GET");
});

// Handle worker delete on POST.
exports.worker_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker delete POST");
});

// Display worker update form on GET.
exports.worker_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker update GET");
});

// Handle worker update on POST.
exports.worker_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker update POST");
});
