const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found"
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  let category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "New Category not created.! Check if it already exist."
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Category not found"
      });
    }
    res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Update Category"
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove Category"
      });
    }
    res.json({
      message: `${category.name} successfully removed`
    });
  });
};
