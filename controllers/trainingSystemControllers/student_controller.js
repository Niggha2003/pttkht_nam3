const Student = require("../../models/trainingSystemModels/student");
const asyncHandler = require("express-async-handler");

// Display list of all students.
exports.student_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const student_list = await Student.find({}).populate('accountTraining').populate('worker').exec();
  res.json(student_list);
  
  
});

// Display detail page for a specific student.
exports.student_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const student_detail = await Student.findById(req.params.id).populate('accountTraining').populate('worker').exec();
  res.json(student_detail);
  
  
});

// Display student create form on GET.
exports.student_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student create GET");
});

// Handle student create on POST.
exports.student_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const student = new Student(); 
  student.accountTraining = req.body.accountTraining;
  student.worker = req.body.worker;

  await student.save();
  res.json(student);
  
  
});

// Display student delete form on GET.
exports.student_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkStudentExist = await Student.findById(req.params.id).exec();

  if(!checkStudentExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Student.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle student delete on POST.
exports.student_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student delete POST");
});

// Display student update form on GET.
exports.student_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: student update GET");
});

// Handle student update on POST.
exports.student_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkStudentExist = await Student.findById(req.params.id).exec();

  if(!checkStudentExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Student.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          accountTraining : req.body.accountTraining,
          worker : req.body.worker,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
