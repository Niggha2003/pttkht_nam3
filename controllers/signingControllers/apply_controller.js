const Apply = require("../../models/signingModels/apply");
const asyncHandler = require("express-async-handler");

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

  const apply = new Apply(); 
  apply.phoneNumber = req.body.phoneNumber;
  apply.email = req.body.email;
  apply.name = req.body.name;
  apply.birthDate = req.body.birthDate;
  apply.order = req.body.order;
  apply.state = req.body.state;

  await apply.save();
  res.json(apply);
  
  
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
          phoneNumber : req.body.phoneNumber,
          email : req.body.email,
          name : req.body.name,
          birthDate : req.body.birthDate,
          order : req.body.order,
          state : req.body.state,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
