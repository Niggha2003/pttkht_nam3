const fs = require('fs');
const path = require('path');

const AccountEmployee = require("../../models/accountModels/accountEmployee");
const Person = require("../../models/accountModels/person");

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
    const p = req.body.accountEmployee.person
    const person = new Person();
    
    person.name = p.name,
    person.birthDate = p.birthDate,
    person.phoneNumber = p.phoneNumber,
    person.academicLevel = p.academicLevel,
    person.anotherCertificates = p.anotherCertificates,
    person.address = p.address,
    person.associateContact = p.associateContact,
    person.identifyCard = p.identifyCard != null ? p.identifyCard : null,
    person.photo = person._id + "." + p.photoType;
    const base64Data = p.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    
    const uploadPath = require('path').join(__dirname, '../../public', 'images','user', person.photo);

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
    
    await person.save();
    
    const accountEmployee = new AccountEmployee();
    accountEmployee.accountCode = req.body.accountEmployee.accountCode;
    accountEmployee.password = md5Hash(req.body.accountEmployee.password);
    accountEmployee.role = req.body.accountEmployee.role;
    accountEmployee.person = person;
  
    await accountEmployee.save();
    res.json({status: 200});
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
          accountCode : req.body.accountEmployee.accountCode,
          password : req.body.accountEmployee.password,
          role : req.body.accountEmployee.role,
        }
      }
    ).exec();
    const p = req.body.accountEmployee.person;
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
