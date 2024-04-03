const AccountEmployee = require("../../models/accountModels/accountEmployee");
const asyncHandler = require("express-async-handler");

// Display list of all accountEmployees.
exports.accountEmployee_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee list");
});

// Display detail page for a specific accountEmployee.
exports.accountEmployee_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: accountEmployee detail: ${req.params.id}`);
});

// Display accountEmployee create form on GET.
exports.accountEmployee_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee create GET");
});

// Handle accountEmployee create on POST.
exports.accountEmployee_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee create POST");
});

// Display accountEmployee delete form on GET.
exports.accountEmployee_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee delete GET");
});

// Handle accountEmployee delete on POST.
exports.accountEmployee_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee delete POST");
});

// Display accountEmployee update form on GET.
exports.accountEmployee_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee update GET");
});

// Handle accountEmployee update on POST.
exports.accountEmployee_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee update POST");
});
