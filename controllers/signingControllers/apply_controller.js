const Apply = require("../../models/signingModels/apply");
const asyncHandler = require("express-async-handler");

const connectCreate = require('../../routes/connect');


// Display list of all applys.
exports.apply_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const apply_list = await Apply.find({}).populate('order').exec();
  res.json(apply_list);
  
  
});

// Display detail page for a specific apply.
exports.apply_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const apply_detail = await Apply.findById(req.params.id).populate('order').exec();
  res.json(apply_detail);
  
  
});

// Display apply create form on GET.
exports.apply_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: apply create GET");
});

// Handle apply create on POST.
exports.apply_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  try{
    const apply = new Apply(); 
    apply.phoneNumber = req.body.apply.phoneNumber;
    apply.email = req.body.apply.email;
    apply.name = req.body.apply.name;
    apply.birthDate = req.body.apply.birthDate;
    apply.order = req.body.apply.order;

    await apply.save();
    res.json({status: 200});
  }catch(e) {
    res.json({status: 500});
  }

  
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
          ...(req.body.state != null && {state : req.body.state, timeModify: req.body.timeModify}),
          ...(req.body.portfolio != null && {portfolio : req.body.portfolio}),
        }
      }
    ).exec();
    res.status(200).json({status: 200})
  }

  
});
