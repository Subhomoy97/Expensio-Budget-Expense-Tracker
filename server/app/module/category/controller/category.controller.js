const categoryModel = require("../model/category.model");
const categoryRepository = require("../repositories/category.repositories");

class CategoryController {
  async addCategory(req, res) {
    try {

       if(!req.body.name){
        return res.status(500).json({
          message:"category_name is Required"
        })
      }
      const exists = await categoryModel.findOne({ name: req.body.name, userId: req.user._id });
     
      if (exists) return res.status(400).json({ message: 'Category already exists' });
      
  
      const category = new categoryModel({
        name: req.body.name,
        userId: req.user._id,
        isDefault: false
      });
  
      if (req.file) {
        category.icon = req.file.path;
      }
  
      await category.save();
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getDefaultCategories(req, res) {
    try {
      const categories = await categoryRepository.getDefaultCategories();
      res.json({ message: "Default categories fetched successfully", category: categories });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getallCategories(req, res) {
    try {
      const categories = await categoryRepository.getUserCategories(req.user._id);
      res.json({ message: "Categories fetched successfully", categories });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await categoryRepository.findById(req.params.id);
      if (!category) return res.status(404).json({ message: "Category not found" });

      if (category.isDefault || category.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Cannot delete this category" });
      }

      await categoryRepository.deleteCategory(category);
      res.json({ message: "Category deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new CategoryController();
