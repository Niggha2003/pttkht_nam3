const News = require("../../models/newsModels/news");

const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all newss.
exports.news_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const news_list = await News.find({}).exec();
  res.json(news_list);
  
});

// Display detail page for a specific News.
exports.news_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const news_detail = await News.findById(req.params.id).exec();
  res.json(news_detail);

});

// Display news create form on GET.
exports.news_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: news create GET");
});

// Handle news create on POST.
exports.news_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

    const news = new News();

    news.title =  req.body.news.title;
    news.content = req.body.news.content;
    news.pictureBase64 =  req.body.news.pictureBase64;
    news.type = req.body.news.type;
    news.paragraph = req.body.news.paragraph;

    if(req.body.news.timeOutstandingRelease) {
        news.timeOutstandingRelease = req.body.news.timeOutstandingRelease;
    }
    if(req.body.news.focalTitle) {
        news.focalTitle = req.body.news.focalTitle;
    }
    if(req.body.news.showOnHome != null) {
      news.showOnHome = req.body.news.showOnHome;
    }
    if(req.body.news.isForeignNews) {
      news.isForeignNews = req.body.news.isForeignNews;
    }

    await news.save();
    res.json(news);

});

// Display news delete form on GET.
exports.news_delete_get = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkNewsExist = await News.findById(req.params.id).exec();

  if(!checkNewsExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await News.deleteOne({_id : req.params.id}).exec();
    res.send("Delete success!");
  }

  
});

// Handle news delete on POST.
exports.news_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: news delete POST");
});

// Display news update form on GET.
exports.news_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: news update GET");
});

// Handle news update on POST.
exports.news_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkNewsExist = await News.findById(req.params.id).exec();

  if(!checkNewsExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await News.updateOne(
      {_id: req.params.id},
      {$set: 
        {
            title :  req.body.news.title,
            content : req.body.news.content,
            pictureBase64 : req.body.news.pictureBase64,
            type : req.body.news.type,
            paragraph : req.body.news.paragraph,
            ...(req.body.news.timeOutstandingRelease && {timeOutstandingRelease : req.body.news.timeOutstandingRelease}),
            ...(req.body.news.focalTitle && {focalTitle : req.body.news.focalTitle}),
            ...(req.body.news.showOnHome != null && {showOnHome : req.body.news.showOnHome}),
            ...(req.body.news.isForeignNews && {isForeignNews : req.body.news.isForeignNews}),
        }
      }
    ).exec();

    res.status(200).send({status: 200})
  }
});
