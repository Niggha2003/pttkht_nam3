const Order = require("../../models/orderModels/order");
const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all orders.
exports.order_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order_list = 
        await Order.find({})
                    .populate('employee')
                    .exec();

  res.json(order_list);
  
  
});

// Display detail page for a specific order.
exports.order_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order_detail = 
        await Order.findById(req.params.id)
                    .populate('employee')
                    .exec();

  res.json(order_detail);
  
  
});

// Display order create form on GET.
exports.order_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order create GET");
});

// Handle order create on POST.
exports.order_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order = new Order(); 
  order.companyName = req.body.companyName;
  order.companyAddress = req.body.companyAddress;
  order.jobDescription = req.body.jobDescription;
  order.quantityRequire = req.body.quantityRequire;
  order.ageRequire = req.body.ageRequire;
  order.heightRequire = req.body.heightRequire;
  order.weightRequire = req.body.weightRequire;
  order.bodyRequire = req.body.bodyRequire;
  order.academicLevelRequire = req.body.academicLevelRequire;
  order.salary = req.body.salary;
  order.timeNeeded = req.body.timeNeeded;
  order.state = req.body.state;
  order.type = req.body.type;
  order.employee = req.body.employee;

  await order.save();
  res.status(200).send({status: 'create success'})
  
  
});

// Display order delete form on GET.
exports.order_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkOrderExist = await Order.findById(req.params.id).exec();

  if(!checkOrderExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Order.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
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
  connectCreate.connect();
  
  const checkOrderExist = await Order.findById(req.params.id).exec();

  if(!checkOrderExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Order.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          companyName : req.body.companyName,
          companyAddress : req.body.companyAddress,
          jobDescription : req.body.jobDescription,
          quantityRequire : req.body.quantityRequire,
          ageRequire : req.body.ageRequire,
          heightRequire : req.body.heightRequire,
          weightRequire : req.body.weightRequire,
          bodyRequire : req.body.bodyRequire,
          academicLevelRequire : req.body.academicLevelRequire,
          salary : req.body.salary,
          timeNeeded : req.body.timeNeeded,
          state : req.body.state,
          type : req.body.type,
          employee : req.body.employee,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
