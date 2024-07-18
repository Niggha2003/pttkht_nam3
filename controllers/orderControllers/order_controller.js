const fs = require('fs');
const path = require('path');

const Order = require("../../models/orderModels/order");
const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all orders.
exports.order_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  let order_list;
  if(req.query && req.query != {}) {
    order_list = 
        await Order.find({...req.query})
                    .populate('employee')
                    .exec();
  }else{
    order_list = 
        await Order.find({})
                    .populate('employee')
                    .exec();
  }

  res.json(order_list);
  
  
});

// Display detail page for a specific order.
exports.order_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

    order_detail = 
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
  order.companyName = req.body.order.companyName;
  order.companyAddress = req.body.order.companyAddress;
  order.jobDescription = req.body.order.jobDescription;
  order.quantityRequire = req.body.order.quantityRequire;
  order.ageRequire = req.body.order.ageRequire;
  order.heightRequire = req.body.order.heightRequire;
  order.weightRequire = req.body.order.weightRequire;
  order.bodyRequire = req.body.order.bodyRequire;
  order.academicLevelRequire = req.body.order.academicLevelRequire;
  order.salary = req.body.order.salary;
  order.timeNeeded = req.body.order.timeNeeded;
  order.state = req.body.order.state;
  order.type = req.body.order.type;
  order.employee = req.body.order.employee;
  order.paragraph = req.body.order.paragraph;
  order.isHot = req.body.order.isHot;
  order.photo = order._id + "." + req.body.order.photoType;
  order.orderCode = req.body.order.orderCode;
  order.orderName= req.body.order.orderName;
  
  const base64Data = req.body.order.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '');

  const uploadPath = require('path').join(__dirname, '../../public', 'images','order', order.photo);

  // Tạo một WriteStream để ghi dữ liệu vào tệp
  const writeStream = fs.createWriteStream(uploadPath);
  // Chuyển dữ liệu base64 thành Buffer
  const bufferData = Buffer.from(base64Data, 'base64');
  // Ghi dữ liệu vào tệp
  writeStream.write(bufferData);
  // Xử lý sự kiện lỗi
  writeStream.on('error', (err) => {
    console.error('Lỗi khi lưu tệp:', err);
    res.status(500).json({ message: 'Lỗi khi lưu tệp' });
  });

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
          orderCode : req.body.order.orderCode,
          orderName: req.body.order.orderName,
          companyName : req.body.order.companyName,
          companyAddress : req.body.order.companyAddress,
          jobDescription : req.body.order.jobDescription,
          quantityRequire : req.body.order.quantityRequire,
          ageRequire : req.body.order.ageRequire,
          heightRequire : req.body.order.heightRequire,
          weightRequire : req.body.order.weightRequire,
          bodyRequire : req.body.order.bodyRequire,
          academicLevelRequire : req.body.order.academicLevelRequire,
          salary : req.body.order.salary,
          timeNeeded : req.body.order.timeNeeded,
          state : req.body.order.state,
          type : req.body.order.type,
          employee : req.body.order.employee,
          paragraph : req.body.order.paragraph,
          isHot : req.body.order.isHot,
          ...(req.body.order.photoType && { photo: req.body.order._id + "." + req.body.order.photoType }), // chỉ cập nhật photo mới nếu có photoType được gửi đi
        }
      }
    ).exec();
    const base64Data = req.body.order.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    if(req.body.order.photoType) {
      const uploadPath = require('path').join(__dirname, '../../public', 'images','order', req.body.order._id + "." + req.body.order.photoType);
      // Tạo một WriteStream để ghi dữ liệu vào tệp
      const writeStream = fs.createWriteStream(uploadPath);
      // Chuyển dữ liệu base64 thành Buffer
      const bufferData = Buffer.from(base64Data, 'base64');
      // Ghi dữ liệu vào tệp
      writeStream.write(bufferData);
      // Xử lý sự kiện lỗi
      writeStream.on('error', (err) => {
        console.error('Lỗi khi lưu tệp:', err);
        res.status(500).json({ message: 'Lỗi khi lưu tệp' });
      });
    }
    res.status(200).send({status: 200})
  }

  
});
