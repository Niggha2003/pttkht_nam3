const Flight = require("../../models/orderModels/flight");
const asyncHandler = require("express-async-handler");

// Display list of all flights.
exports.flight_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight list");
});

// Display detail page for a specific flight.
exports.flight_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: flight detail: ${req.params.id}`);
});

// Display flight create form on GET.
exports.flight_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight create GET");
});

// Handle flight create on POST.
exports.flight_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight create POST");
});

// Display flight delete form on GET.
exports.flight_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight delete GET");
});

// Handle flight delete on POST.
exports.flight_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight delete POST");
});

// Display flight update form on GET.
exports.flight_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight update GET");
});

// Handle flight update on POST.
exports.flight_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight update POST");
});
