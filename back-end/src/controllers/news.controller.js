const db = require("../models");
const News = db.news;

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a News
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save News in the database
  news
    .save(news)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  News.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    });
};

// Retrieve News by Page
exports.findByPage = (req, res, next) => {
  let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1;

  News
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, news) => {
      News.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
        if (err) return next(err);
        res.send(news) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
      });
    });
};

// Find a single News with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found News with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving News with id=" + id });
    });
};

// Update a News by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  News.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update News with id=${id}. Maybe News was not found!`
        });
      } else res.send({ message: "News was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating News with id=" + id
      });
    });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`
        });
      } else {
        res.send({
          message: "News was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete News with id=" + id
      });
    });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
  News.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} News were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all news."
      });
    });
};

