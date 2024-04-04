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

  connectCreate.close();
});

// Display detail page for a specific accountEmployee.
exports.accountEmployee_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const accountEmployee_detail = await AccountEmployee.findById(req.params.id).populate('person').exec();
  res.json(accountEmployee_detail);

  connectCreate.close();
});

// Display accountEmployee create form on GET.
exports.accountEmployee_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: accountEmployee create GET");
});

// Handle accountEmployee create on POST.
exports.accountEmployee_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkAccountExist = await AccountEmployee.findOne({ accountCode: req.query.accountCode }).exec();

  if(checkAccountExist) {
    res.status(409).json({ error: 'ID already exists' });
  }else{
    const accountEmployee = new AccountEmployee();

    accountEmployee.accountCode = req.query.accountCode;
    accountEmployee.password = md5Hash(req.query.password);
    accountEmployee.role = req.query.role;
    accountEmployee.person = req.query.person;
  
    await accountEmployee.save();
    res.json(accountEmployee);
  }

  connectCreate.close();
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

  connectCreate.close();
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
          accountCode : req.query.accountCode,
          password : md5Hash(req.query.password),
          role : req.query.role,
          person : req.query.person,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
