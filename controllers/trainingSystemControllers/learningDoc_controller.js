const LearningDoc = require("../../models/trainingSystemModels/learningDoc");
const asyncHandler = require("express-async-handler");

// Display list of all learningDocs.
exports.learningDoc_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const learningDoc_list = await LearningDoc.find({}).exec();
  res.json(learningDoc_list);
  
  
});

// Display detail page for a specific learningDoc.
exports.learningDoc_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const learningDoc_detail = await LearningDoc.findById(req.params.id).exec();
  res.json(learningDoc_detail);
  
  
});

// Display learningDoc create form on GET.
exports.learningDoc_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc create GET");
});

// Handle learningDoc create on POST.
exports.learningDoc_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const learningDoc = new LearningDoc(); 
  learningDoc.name = req.body.name;
  learningDoc.path = req.body.path;

  await learningDoc.save();
  res.json(learningDoc);
  
  
});

// Display learningDoc delete form on GET.
exports.learningDoc_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkLearningDocExist = await LearningDoc.findById(req.params.id).exec();

  if(!checkLearningDocExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await LearningDoc.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle learningDoc delete on POST.
exports.learningDoc_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc delete POST");
});

// Display learningDoc update form on GET.
exports.learningDoc_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: learningDoc update GET");
});

// Handle learningDoc update on POST.
exports.learningDoc_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkLearningDocExist = await LearningDoc.findById(req.params.id).exec();

  if(!checkLearningDocExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await LearningDoc.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          name : req.body.name,
          path : req.body.path,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
