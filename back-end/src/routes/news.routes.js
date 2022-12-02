module.exports = app => {
  const news = require("../controllers/news.controller.js");

  var router = require("express").Router();

  // Create a new News
  router.post("/", news.create);

  // Retrieve all News
  router.get("/", news.findAll);

  // Retrieve News by Page
  router.get("/:page", news.findByPage);

  // Retrieve all published News
  // router.get("/published", news.findAllPublished);

  // Retrieve a single News with id
  router.get("/:id", news.findOne);

  // Update a News with id
  router.put("/:id", news.update);

  // Delete a News with id
  router.delete("/:id", news.delete);

  // Create a new News
  router.delete("/", news.deleteAll);

  app.use("/api/news", router);
};
