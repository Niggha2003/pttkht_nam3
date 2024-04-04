const Apply = require("../../models/signingModels/apply");
const asyncHandler = require("express-async-handler");

// Display list of all applys.
exports.apply_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const apply_list = await Apply.find({}).populate('order').exec();
  res.json(apply_list);
  
  connectCreate.close();
});

// Display detail page for a specific apply.
exports.apply_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const apply_detail = await Apply.findById(req.params.id).populate('order').exec();
  res.json(apply_detail);
  
  connectCreate.close();
});

// Display apply create form on GET.
exports.apply_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply create GET");
});

// Handle apply create on POST.
exports.apply_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const apply = new Apply(); 
  apply.phoneNumber = req.query.phoneNumber;
  apply.email = req.query.email;
  apply.name = req.query.name;
  apply.birthDate = req.query.birthDate;
  apply.order = req.query.order;
  apply.state = req.query.state;

  await apply.save();
  res.json(apply);
  
  connectCreate.close();
});

// Display apply delete form on GET.
exports.apply_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkApplyExist = await Apply.findById(req.params.id).exec();

  if(!checkApplyExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Apply.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  connectCreate.close();
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
  connectCreate.connect();
  
  const checkApplyExist = await Apply.findById(req.params.id).exec();

  if(!checkApplyExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Apply.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          phoneNumber : req.query.phoneNumber,
          email : req.query.email,
          name : req.query.name,
          birthDate : req.query.birthDate,
          order : req.query.order,
          state : req.query.state,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
