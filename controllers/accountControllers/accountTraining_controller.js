const AccountTraining = require('../../models/accountModels/accountTraining');
const connectCreate = require('../../routes/connect');

const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

/// md5 hash ///
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

exports.accountTraining_list = asyncHandler(async (req, res, next) => {
    connectCreate.connect();

    const accountTraining_list = await AccountTraining.find({}).exec();
    res.json(accountTraining_list);
    
    connectCreate.close();
});

// Display detail page for a specific Author.
exports.accountTraining_detail = asyncHandler(async (req, res, next) => {
    connectCreate.connect();
  
    const accountTraining_detail = await AccountTraining.findById(req.params.id).populate('person').exec();
    res.json(accountTraining_detail);
  
    connectCreate.close();
});

// Display Author create form on GET.
exports.accountTraining_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.accountTraining_create_post = asyncHandler(async (req, res, next) => {
    connectCreate.connect();
  
    const checkAccountExist = await AccountTraining.findOne({ accountCode: req.query.accountCode }).exec();
  
    if(checkAccountExist) {
      res.status(409).json({ error: 'ID already exists' });
    }else{
      const accountTraining = new AccountTraining();
  
      accountTraining.accountCode = req.query.accountCode;
      accountTraining.password = md5Hash(req.query.password);
      accountTraining.role = req.query.role;
      accountTraining.person = req.query.personId;
    
      await accountTraining.save();
      res.json(accountTraining);
    }
  
    connectCreate.close();
});

// Display Author delete form on GET.
exports.accountTraining_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkAccountExist = await AccountTraining.findById(req.params.id).exec();

  if(!checkAccountExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await AccountTraining.deleteOne({accountCode: checkAccountExist.accountCode}).exec();
    res.send("Delete success!");
  }

  connectCreate.close();
});

// Handle Author delete on POST.
exports.accountTraining_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.accountTraining_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.accountTraining_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkAccountExist = await AccountTraining.findById(req.params.id).exec();

  if(!checkAccountExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await AccountTraining.updateOne(
      {accountCode: checkAccountExist.accountCode},
      {$set: 
        {
          accountCode : req.query.accountCode,
          password : md5Hash(req.query.password),
          role : req.query.role,
          person : req.query.personId,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});


