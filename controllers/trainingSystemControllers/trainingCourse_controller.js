const TrainingCourse = require("../../models/trainingSystemModels/trainingCourse");
const asyncHandler = require("express-async-handler");

// Display list of all trainingCourses.
exports.trainingCourse_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingCourse_list = await TrainingCourse.find({}).exec();
  res.json(trainingCourse_list);
  
  connectCreate.close();
});

// Display detail page for a specific trainingCourse.
exports.trainingCourse_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingCourse_detail = await TrainingCourse.findById(req.params.id).exec();
  res.json(trainingCourse_detail);
  
  connectCreate.close();
});

// Display trainingCourse create form on GET.
exports.trainingCourse_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse create GET");
});

// Handle trainingCourse create on POST.
exports.trainingCourse_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const trainingCourse = new TrainingCourse(); 
  trainingCourse.name = req.query.name;
  trainingCourse.description = req.query.description;
  trainingCourse.students = req.query.students;
  trainingCourse.trainingClasses = req.query.trainingClasses;

  await trainingCourse.save();
  res.json(trainingCourse);
  
  connectCreate.close();
});

// Display trainingCourse delete form on GET.
exports.trainingCourse_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTrainingCourseExist = await TrainingCourse.findById(req.params.id).exec();

  if(!checkTrainingCourseExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await TrainingCourse.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  connectCreate.close();
});

// Handle trainingCourse delete on POST.
exports.trainingCourse_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse delete POST");
});

// Display trainingCourse update form on GET.
exports.trainingCourse_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: trainingCourse update GET");
});

// Handle trainingCourse update on POST.
exports.trainingCourse_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkTrainingCourseExist = await TrainingCourse.findById(req.params.id).exec();

  if(!checkTrainingCourseExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await TrainingCourse.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          name : req.query.name,
          description : req.query.description,
          students : req.query.students,
          trainingClasses : req.query.trainingClasses,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
