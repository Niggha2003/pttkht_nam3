const TrainingClass = require("../../models/trainingSystemModels/trainingClass");
const asyncHandler = require("express-async-handler");

// Display list of all trainingClasss.
exports.trainingClass_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass_list = await TrainingClass.find({}).exec();
  res.json(trainingClass_list);
  
  
});

// Display detail page for a specific trainingClass.
exports.trainingClass_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass_detail = await TrainingClass.findById(req.params.id).exec();
  res.json(trainingClass_detail);
  
  
});

// Display trainingClass create form on GET.
exports.trainingClass_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingClass create GET");
});

// Handle trainingClass create on POST.
exports.trainingClass_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingClass = new TrainingClass(); 
  trainingClass.name = req.body.name;
  trainingClass.description = req.body.description;
  trainingClass.students = req.body.students;
  trainingClass.dayOfWeek = req.body.dayOfWeek;
  trainingClass.dayStart = req.body.dayStart;
  trainingClass.dayEnd = req.body.dayEnd;
  trainingClass.timeStart = req.body.timeStart;
  trainingClass.timeEnd = req.body.timeEnd;
  trainingClass.teacher = req.body.teacher;
  trainingClass.subject = req.body.subject;
  trainingClass.learningDocs = req.body.learningDocs;
  trainingClass.marks = req.body.marks;

  await trainingClass.save();
  res.json(trainingClass);
  
  
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
          name : req.body.name,
          description : req.body.description,
          students : req.body.students,
          dayOfWeek : req.body.dayOfWeek,
          dayStart : req.body.dayStart,
          dayEnd : req.body.dayEnd,
          timeStart : req.body.timeStart,
          timeEnd : req.body.timeEnd,
          teacher : req.body.teacher,
          subject : req.body.subject,
          learningDocs : req.body.learningDocs,
          marks : req.body.marks,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
