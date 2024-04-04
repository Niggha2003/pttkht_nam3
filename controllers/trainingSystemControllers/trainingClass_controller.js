const TrainingClass = require("../../models/trainingSystemModels/trainingClass");
const asyncHandler = require("express-async-handler");

// Display list of all trainingClasss.
exports.trainingClass_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass_list = await TrainingClass.find({}).exec();
  res.json(trainingClass_list);
  
  connectCreate.close();
});

// Display detail page for a specific trainingClass.
exports.trainingClass_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass_detail = await TrainingClass.findById(req.params.id).exec();
  res.json(trainingClass_detail);
  
  connectCreate.close();
});

// Display trainingClass create form on GET.
exports.trainingClass_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass create GET");
});

// Handle trainingClass create on POST.
exports.trainingClass_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass = new TrainingClass(); 
  trainingClass.name = req.query.name;
  trainingClass.description = req.query.description;
  trainingClass.students = req.query.students;
  trainingClass.dayOfWeek = req.query.dayOfWeek;
  trainingClass.dayStart = req.query.dayStart;
  trainingClass.dayEnd = req.query.dayEnd;
  trainingClass.timeStart = req.query.timeStart;
  trainingClass.timeEnd = req.query.timeEnd;
  trainingClass.teacher = req.query.teacher;
  trainingClass.subject = req.query.subject;
  trainingClass.learningDocs = req.query.learningDocs;
  trainingClass.marks = req.query.marks;

  await trainingClass.save();
  res.json(trainingClass);
  
  connectCreate.close();
});

// Display trainingClass delete form on GET.
exports.trainingClass_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTrainingClassExist = await TrainingClass.findById(req.params.id).exec();

  if(!checkTrainingClassExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await TrainingClass.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  connectCreate.close();
});

// Handle trainingClass delete on POST.
exports.trainingClass_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass delete POST");
});

// Display trainingClass update form on GET.
exports.trainingClass_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass update GET");
});

// Handle trainingClass update on POST.
exports.trainingClass_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTrainingClassExist = await TrainingClass.findById(req.params.id).exec();

  if(!checkTrainingClassExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await TrainingClass.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          name : req.query.name,
          description : req.query.description,
          students : req.query.students,
          dayOfWeek : req.query.dayOfWeek,
          dayStart : req.query.dayStart,
          dayEnd : req.query.dayEnd,
          timeStart : req.query.timeStart,
          timeEnd : req.query.timeEnd,
          teacher : req.query.teacher,
          subject : req.query.subject,
          learningDocs : req.query.learningDocs,
          marks : req.query.marks,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
