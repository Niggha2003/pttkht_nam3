const Worker = require("../../models/workingModels/worker");
const asyncHandler = require("express-async-handler");
const connectCreate = require('../../routes/connect');

// Display list of all workers.
exports.worker_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const worker_list = 
      await Worker.find({})
                  .populate({
                    path: 'accountTraining',
                    populate: {
                      path: 'person'
                    }
                  })
                  .exec();
  res.json(worker_list);
  
  connectCreate.close();
});

// Display detail page for a specific worker.
exports.worker_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const worker_detail = 
      await Worker.findById(req.params.id)
                  .populate({
                    path: 'accountTraining',
                    populate: {
                      path: 'person'
                    }
                  })
                  .exec();
  res.json(worker_detail);
  
  connectCreate.close();
});

// Display worker create form on GET.
exports.worker_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: worker create GET");
});

// Handle worker create on POST.
exports.worker_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const worker = new Worker(); 
  worker.isMarried = req.query.isMarried;
  worker.accountTraining = req.query.accountTraining;

  await worker.save();
  res.json(worker);
  
  connectCreate.close();
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

  connectCreate.close();
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
    await Worker.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          isMarried : req.query.isMarried,
          accountTraining : req.query.accountTraining,
        }
      }
    ).exec();
    res.send("Update success!");
  }

  connectCreate.close();
});
