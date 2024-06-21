const Subject = require("../../models/trainingSystemModels/subject");
const asyncHandler = require("express-async-handler");

// Display list of all subjects.
exports.subject_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const subject_list = await Subject.find({}).exec();
  res.json(subject_list);
  
  
});

// Display detail page for a specific subject.
exports.subject_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const subject_detail = await Subject.findById(req.params.id).exec();
  res.json(subject_detail);
  
  
});

// Display subject create form on GET.
exports.subject_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject create GET");
});

// Handle subject create on POST.
exports.subject_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const subject = new Subject(); 
  subject.name = req.body.name;
  subject.description = req.body.description;

  await subject.save();
  res.json(subject);
  
  
});

// Display subject delete form on GET.
exports.subject_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkSubjectExist = await Subject.findById(req.params.id).exec();

  if(!checkSubjectExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Subject.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle subject delete on POST.
exports.subject_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject delete POST");
});

// Display subject update form on GET.
exports.subject_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject update GET");
});

// Handle subject update on POST.
exports.subject_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkSubjectExist = await Subject.findById(req.params.id).exec();

  if(!checkSubjectExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Subject.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          name : req.body.name,
          description : req.body.description,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
