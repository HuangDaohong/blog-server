const Category = require('../model/category.model');
class CategoryService {

  // 插入数据
  async createCategory (name, description) {

    return await Category.create(name, description);
  }

  // 查询所有数据
  async finAllCategorys () {
    return await Category.findAndCountAll();
  }

  // 删除数据
  async removeCategory (id) {
    const res = await Category.destroy({
      where: { id }
    });
    return res > 0 ? true : false;
  }

  // 修改数据
  async updateCategory (category) {
    const res = await Category.update(category, {
      where: { id: category.id }
    });
    return res[0];
  }
}

module.exports = new CategoryService();
