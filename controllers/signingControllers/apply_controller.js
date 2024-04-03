const Apply = require("../../models/signingModels/apply");
const asyncHandler = require("express-async-handler");

// Display list of all applys.
exports.apply_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply list");
});

// Display detail page for a specific apply.
exports.apply_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: apply detail: ${req.params.id}`);
});

// Display apply create form on GET.
exports.apply_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply create GET");
});

// Handle apply create on POST.
exports.apply_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply create POST");
});

// Display apply delete form on GET.
exports.apply_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply delete GET");
});

// Handle apply delete on POST.
exports.apply_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply delete POST");
});

// Display apply update form on GET.
exports.apply_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply update GET");
});

// Handle apply update on POST.
exports.apply_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply update POST");
});
