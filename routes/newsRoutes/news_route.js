const express = require("express");
const router = express.Router();

const news_controller = require("../../controllers/newsControllers/news_controller");

/// news routes ///

// GET request for creating a news. NOTE This must come before routes that display news (uses id).
router.get("/create", news_controller.news_create_get);

// POST request for creating news.
router.post("/create", news_controller.news_create_post);

// GET request to delete news.
router.get("/:id/delete", news_controller.news_delete_get);

// POST request to delete news.
router.post("/:id/delete", news_controller.news_delete_post);

// GET request to update news.
router.get("/:id/update", news_controller.news_update_get);

// POST request to update news.
router.post("/:id/update", news_controller.news_update_post);

// GET request for one news.
router.get("/:id", news_controller.news_detail);

// GET request for list of all news items.
router.get("/", news_controller.news_list);


module.exports = router;