const AccountEmployee = require("../../models/accountModels/accountEmployee");

const connectCreate = require('../../routes/connect');

const crypto = require('crypto');
const asyncHandler = require("express-async-handler");

/// md5 hash ///
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}


// Display list of all accountEmployees.
exports.accountEmployee_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const accountEmployee_list = await AccountEmployee.find({}).populate('person').exec();
  res.json(accountEmployee_list);

  
});

// Display detail page for a specific accountEmployee.
exports.accountEmployee_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const accountEmployee_detail = await AccountEmployee.findById(req.params.id).populate('person').exec();
  res.json(accountEmployee_detail);

  
});

// Display accountEmployee create form on GET.
exports.accountEmployee_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee create GET");
});

// Handle accountEmployee create on POST.
exports.accountEmployee_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkAccountExist = await AccountEmployee.findOne({ accountCode: req.body.accountCode }).exec();

  if(checkAccountExist) {
    res.status(409).json({ error: 'ID already exists' });
  }else{
    const accountEmployee = new AccountEmployee();

    accountEmployee.accountCode = req.body.accountCode;
    accountEmployee.password = md5Hash(req.body.password);
    accountEmployee.role = req.body.role;
    accountEmployee.person = req.body.person;
  
    await accountEmployee.save();
    res.json(accountEmployee);
  }

  
});

// Display accountEmployee delete form on GET.
exports.accountEmployee_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkAccountExist = await AccountEmployee.findById(req.params.id).exec();

  if(!checkAccountExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await AccountEmployee.deleteOne({accountCode: checkAccountExist.accountCode}).exec();
    res.send("Delete success!");
  }

  
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
  connectCreate.connect();
  
  const checkAccountExist = await AccountEmployee.findById(req.params.id).exec();

  if(!checkAccountExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await AccountEmployee.updateOne(
      {accountCode: checkAccountExist.accountCode},
      {$set: 
        {
          accountCode : req.body.accountCode,
          password : md5Hash(req.body.password),
          role : req.body.role,
          person : req.body.person,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
