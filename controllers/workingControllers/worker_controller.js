const fs = require('fs');
const path = require('path');

const AccountTraining = require('../../models/accountModels/accountTraining');
const Worker = require("../../models/workingModels/worker");
const Person = require("../../models/accountModels/person");

const asyncHandler = require("express-async-handler");
const connectCreate = require('../../routes/connect');

const accountTraining_controller = require("../accountControllers/accountTraining_controller")

const crypto = require('crypto');

/// md5 hash ///
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

// Display list of all workers.
exports.worker_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  const worker_list = 
      await Worker.find({})
                  .populate('order')
                  .populate({
                    path: 'accountTraining',
                    populate: {
                      path: 'person'
                    }
                  })
                  .exec();
  if(res) {
    res.json(worker_list);
  }else{
    return worker_list;
  }
});

// Display detail page for a specific worker.
exports.worker_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const worker_detail = 
      await Worker.findById(req.params.id)
                  .populate('order')
                  .populate({
                    path: 'accountTraining',
                    populate: {
                      path: 'person'
                    }
                  })
                  .exec();
  res.json(worker_detail);
});

// Display worker create form on GET.
exports.worker_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker create GET");
});

// Handle worker create on POST.
exports.worker_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const checkAccountExist = await AccountTraining.findOne({ accountCode: req.body.worker.accountTraining.accountCode }).exec();

  if(checkAccountExist) {
    res.status(409).json({ error: 'ID already exists' });
  }else{
    const p = req.body.worker.accountTraining.person
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

    // // Đảm bảo rằng thư mục đích tồn tại, nếu không hãy tạo nó
    // const uploadDir = require('path').dirname(uploadPath);
    // if (!require('fs').existsSync(uploadDir)) {
    //   require('fs').mkdirSync(uploadDir, { recursive: true });
    // }

    // require('fs').writeFile(uploadPath, base64Data, 'base64', (err) => {
    //     if (err) {
    //         console.error('Lỗi khi lưu tệp:', err);
    //         return res.status(500).json({ message: 'Lỗi khi lưu tệp' });
    //     }
    // });
    
    await person.save();
    const accountTraining = new AccountTraining();

    accountTraining.accountCode = req.body.worker.accountTraining.accountCode;
    accountTraining.password = md5Hash(req.body.worker.accountTraining.password);
    accountTraining.role = req.body.worker.accountTraining.role;
    accountTraining.person = person;
  
    await accountTraining.save();

    const worker = new Worker(); 
    worker.isMarried = req.body.worker.isMarried;
    worker.accountTraining = accountTraining;

    await worker.save();
    const worker_list = await Worker.find({})
                      .populate('order')
                      .populate({
                        path: 'accountTraining',
                        populate: {
                          path: 'person'
                        }
                      })
                      .exec();
    res.status(200).send({status: 200, data: worker_list});
  }
});

// Display worker delete form on GET.
exports.worker_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkWorkerExist = await Worker.findById(req.params.id).exec();

  if(!checkWorkerExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Worker.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }
});

// Handle worker delete on POST.
exports.worker_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker delete POST");
});

// Display worker update form on GET.
exports.worker_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker update GET");
});

// Handle worker update on POST.
exports.worker_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkWorkerExist = await Worker.findById(req.params.id).exec();

  if(!checkWorkerExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    if(req.body.state != undefined || req.body.orderId != undefined ||  req.body.timeGoBack != undefined || req.body.timeGoAbroad != undefined || req.body.isBanned != undefined || req.body.efficiency != undefined) {
      await Worker.updateOne(
        {_id: req.params.id},
        {$set: 
          {
            ...(req.body.state != undefined && { state : req.body.state }),
            ...(req.body.efficiency != undefined && { efficiency : req.body.efficiency }),
            ...(req.body.isBanned != undefined && { isBanned : req.body.isBanned }),
            ...(req.body.orderId != undefined && { order : req.body.orderId }), 
            ...(req.body.timeGoAbroad != undefined && { timeGoAbroad : req.body.timeGoAbroad }),
            ...(req.body.timeGoBack != undefined && { timeGoBack : req.body.timeGoBack }),
          }
        }
      ).exec();
      console.log(10)
      const worker_list = await Worker.find({})
                        .populate('order')
                        .populate({
                          path: 'accountTraining',
                          populate: {
                            path: 'person'
                          }
                        })
                        .exec();
      res.status(200).send({status: 200, data: worker_list})
    }else{
      await Worker.updateOne(
        {_id: req.params.id},
        {$set: 
          {
            isMarried : req.body.worker.isMarried,
          }
        }
      ).exec();
      req.body.accountTraining = req.body.worker.accountTraining;
      req.params.id = req.body.worker.accountTraining._id;
      accountTraining_controller.accountTraining_update_post(req, res, next);
    }
  }
});
