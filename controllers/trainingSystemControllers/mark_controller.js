const Mark = require("../../models/trainingSystemModels/mark");
const asyncHandler = require("express-async-handler");

// Display list of all marks.
exports.mark_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const mark_list = await Mark.find({}).populate('student').exec();
  res.json(mark_list);
  
  
});

// Display detail page for a specific mark.
exports.mark_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const mark_detail = await Mark.findById(req.params.id).populate('student').exec();
  res.json(mark_detail);
  
  
});

// Display mark create form on GET.
exports.mark_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark create GET");
});

// Handle mark create on POST.
exports.mark_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const mark = new Mark(); 
  mark.middleMark = req.body.middleMark;
  mark.finalMark = req.body.finalMark;
  mark.student = req.body.student;

  await mark.save();
  res.json(mark);
  
  
});

// Display mark delete form on GET.
exports.mark_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkMarkExist = await Mark.findById(req.params.id).exec();

  if(!checkMarkExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Mark.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle mark delete on POST.
exports.mark_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark delete POST");
});

// Display mark update form on GET.
exports.mark_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mark update GET");
});

// Handle mark update on POST.
exports.mark_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkMarkExist = await Mark.findById(req.params.id).exec();

  if(!checkMarkExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Mark.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          middleMark : req.body.middleMark,
          finalMark : req.body.finalMark,
          student : req.body.student,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }

  
});
