const Order = require("../../models/orderModels/order");
const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all orders.
exports.order_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order_list = 
        await Order.find({})
                    .populate('employee')
                    .populate({
                      path: 'workers',
                      populate: {
                        path: 'accountTraining',
                        populate: {
                          path: 'person'
                        }
                      }
                    })
                    .exec();

  res.json(order_list);
  
  connectCreate.close();
});

// Display detail page for a specific order.
exports.order_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order_detail = 
        await Order.findById(req.params.id)
                    .populate('employee')
                    .populate({
                      path: 'workers',
                      populate: {
                        path: 'accountTraining',
                        populate: {
                          path: 'person'
                        }
                      }
                    })
                    .exec();

  res.json(order_detail);
  
  connectCreate.close();
});

// Display order create form on GET.
exports.order_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: order create GET");
});

// Handle order create on POST.
exports.order_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const order = new Order(); 
  order.companyName = req.query.companyName;
  order.companyAddress = req.query.companyAddress;
  order.jobDescription = req.query.jobDescription;
  order.quantityRequire = req.query.quantityRequire;
  order.ageRequire = req.query.ageRequire;
  order.heightRequire = req.query.heightRequire;
  order.weightRequire = req.query.weightRequire;
  order.bodyRequire = req.query.bodyRequire;
  order.academicLevelRequire = req.query.academicLevelRequire;
  order.salary = req.query.salary;
  order.timeNeeded = req.query.timeNeeded;
  order.state = req.query.state;
  order.type = req.query.type;
  order.employee = req.query.employee;
  order.workers = req.query.workers;

  await order.save();
  res.json(order);
  
  connectCreate.close();
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

  connectCreate.close();
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
          companyName : req.query.companyName,
          companyAddress : req.query.companyAddress,
          jobDescription : req.query.jobDescription,
          quantityRequire : req.query.quantityRequire,
          ageRequire : req.query.ageRequire,
          heightRequire : req.query.heightRequire,
          weightRequire : req.query.weightRequire,
          bodyRequire : req.query.bodyRequire,
          academicLevelRequire : req.query.academicLevelRequire,
          salary : req.query.salary,
          timeNeeded : req.query.timeNeeded,
          state : req.query.state,
          type : req.query.type,
          employee : req.query.employee,
          workers : req.query.workers,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
