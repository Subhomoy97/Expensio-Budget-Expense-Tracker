
const Category = require("../model/category.model");

class CategoryRepository {
  async findByNameAndUser(name, userId) {
    return Category.findOne({ name, userId });
  }

  async createCategory(name, userId) {
    const category = new Category({ name, userId, isDefault: false });
    if(req.file){
      category.icon = req.file.filename
    }
    return category.save();
  }

  async getDefaultCategories() {
    return Category.find({ isDefault: true });
  }

  async getUserCategories(userId) {
    return Category.find({ userId });
  }

  async findById(id) {
    return Category.findById(id);
  }

  async deleteCategory(category) {
    return category.deleteOne();
  }
}

module.exports = new CategoryRepository();
