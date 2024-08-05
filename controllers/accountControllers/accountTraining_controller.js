const fs = require('fs');
const path = require('path');

const AccountTraining = require('../../models/accountModels/accountTraining');
const connectCreate = require('../../routes/connect');
const Person = require("../../models/accountModels/person");

const worker_controller = require('../workingControllers/worker_controller')

const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

/// md5 hash ///
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

exports.accountTraining_list = asyncHandler(async (req, res, next) => {
    connectCreate.connect();

    const accountTraining_list = await AccountTraining.find({}).populate('person').exec();
    res.json(accountTraining_list);
    
    
});

// Display detail page for a specific Author.
exports.accountTraining_detail = asyncHandler(async (req, res, next) => {
    connectCreate.connect();
  
    const accountTraining_detail = await AccountTraining.findById(req.params.id).populate('person').exec();
    res.json(accountTraining_detail);
  
    
});

// Display Author create form on GET.
exports.accountTraining_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.accountTraining_create_post = asyncHandler(async (req, res, next) => {
    connectCreate.connect();
  
    const checkAccountExist = await AccountTraining.findOne({ accountCode: req.body.accountTraining.accountCode }).exec();
  
    if(checkAccountExist) {
      res.status(409).json({ error: 'ID already exists' });
    }else{
      const accountTraining = new AccountTraining();
      
      const person = new Person(req.body.accountTraining.person);
      await person.save();

      accountTraining.accountCode = req.body.accountTraining.accountCode;
      accountTraining.password = md5Hash(req.body.accountTraining.password);
      accountTraining.role = req.body.accountTraining.role;
      accountTraining.person = person;
    
      await accountTraining.save();
      res.status(200).send({status: 'create success'})
    }
  
    
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
          accountCode : req.body.accountTraining.accountCode,
          password : req.body.accountTraining.password,
          role : req.body.accountTraining.role,
        }
      }
    ).exec();
    const p = req.body.accountTraining.person;
    await Person.updateOne(
      {_id: p._id},
      {$set: 
        {
          name: p.name,
          birthDate: p.birthDate,
          phoneNumber: p.phoneNumber,
          academicLevel: p.academicLevel,
          anotherCertificates: p.anotherCertificates,
          address: p.address,
          email: p.email,
          associateContact: p.associateContact,
          identifyCard: p.identifyCard,
          ...(p.photoType && { photo: p._id + "." + p.photoType }), // chỉ cập nhật photo mới nếu có photoType được gửi đi
        }
      }
    ).exec();
    
    if(p.photoType) {
      const base64Data = p.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const uploadPath = require('path').join(__dirname, '../../public', 'images','user', p._id + "." + p.photoType);
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
    res.json({status: 200});
  }
});


