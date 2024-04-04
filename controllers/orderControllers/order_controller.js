const Order = require("../../models/orderModels/order");
const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all orders.
exports.order_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order_list = await Order.find({}).exec();
  res.json(order_list);
  
  connectCreate.close();
});

// Display detail page for a specific order.
exports.order_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: order detail: ${req.params.id}`);
});

// Display order create form on GET.
exports.order_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order create GET");
});

// Handle order create on POST.
exports.order_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order create POST");
});

// Display order delete form on GET.
exports.order_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order delete GET");
});

// Handle order delete on POST.
exports.order_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order delete POST");
});

// Display order update form on GET.
exports.order_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order update GET");
});

// Handle order update on POST.
exports.order_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order update POST");
});
