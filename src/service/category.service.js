const Category = require('../model/category.model');
const Article = require('../model/article.model');
class CategoryService {
  // 插入数据
  async createCategory(name, description, background) {
    return await Category.create(name, description, background);
  }

  // 根据id查询数据
  async findOneById(id) {
    return await Category.findOne({
      where: {
        id: id,
      },
    });
  }

  // 查询所有数据
  async finAllCategorys() {
    let res = await Category.findAndCountAll();
    // 查询分类对应文章数目
    for (let i = 0; i < res.rows.length; i++) {
      let articleCount = await Article.count({
        where: {
          category_id: res.rows[i].id,
        },
      });
      //  在结果中添加articleCount属性
      res.rows[i].dataValues.articleCount = articleCount;
    }
    return res;
  }

  // 分页查询数据
  async finAllCategorysByPage(pageNum, pageSize) {
    // console.log(pageNum, pageSize,'@@');
    let res = await Category.findAndCountAll({
      limit: +pageSize,
      offset: (pageNum - 1) * pageSize,
    });
    for (let i = 0; i < res.rows.length; i++) {
      let articleCount = await Article.count({
        where: {
          category_id: res.rows[i].id,
        },
      });
      res.rows[i].dataValues.articleCount = articleCount;
    }
    return {
      pageNum: pageNum,
      pageSize: pageSize,
      total: res.count,
      list: res.rows,
    };
  }

  // 删除数据
  async removeCategory(id) {
    const res = await Category.destroy({
      where: { id },
    });
    return res === 1 ? true : false;
  }

  // 修改数据
  async updateCategory(category) {
    const res = await Category.update(category, {
      where: { id: category.id },
    });
    return res[0];
  }

  // 根据id查询数据
  async findCategoryById(id) {
    return await Category.findOne({
      where: { id },
    });
  }
}

module.exports = new CategoryService();
