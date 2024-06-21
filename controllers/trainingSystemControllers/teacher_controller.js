const Teacher = require("../../models/trainingSystemModels/teacher");
const asyncHandler = require("express-async-handler");

// Display list of all teachers.
exports.teacher_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const teacher_list = await Teacher.find({}).populate('accountTraining').populate('subjects').exec();
  res.json(teacher_list);
  
  
});

// Display detail page for a specific teacher.
exports.teacher_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const teacher_detail = await Teacher.findById(req.params.id).populate('accountTraining').populate('subjects').exec();
  res.json(teacher_detail);
  
  
});

// Display teacher create form on GET.
exports.teacher_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher create GET");
});

// Handle teacher create on POST.
exports.teacher_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const teacher = new Teacher(); 
  teacher.accountTraining = req.body.accountTraining;
  teacher.subjects = req.body.subjects;

  await teacher.save();
  res.json(teacher);
  
  
});

// Display teacher delete form on GET.
exports.teacher_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTeacherExist = await Teacher.findById(req.params.id).exec();

  if(!checkTeacherExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Teacher.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle teacher delete on POST.
exports.teacher_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher delete POST");
});

// Display teacher update form on GET.
exports.teacher_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: teacher update GET");
});

// Handle teacher update on POST.
exports.teacher_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTeacherExist = await Teacher.findById(req.params.id).exec();

  if(!checkTeacherExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Teacher.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          accountTraining : req.body.accountTraining,
          subjects : req.body.subjects,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
