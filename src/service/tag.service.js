const Tag = require('../model/tag.model');
const { Op } = require('sequelize');
const ArticleTag = require('../model/article_tag.model');
const Article = require('../model/article.model');
class TagService {
  // 插入数据
  async createTag(name, description, color, background) {
    console.log('tag@@@@', name, description, color, background);
    return await Tag.create(name, description, color, background);
  }

  // 查询所有数据
  async finAllTags() {
    return await Tag.findAndCountAll({
      // include: [
      //   {
      //     model: Article,
      //   },
      // ],
    });
  }

  // 删除数据
  async removeTag(id) {
    const res = await Tag.destroy({
      where: { id },
    });
    return res > 0 ? true : false;
  }

  // 修改数据
  async updateTag(id, tag) {
    const res = await Tag.update(tag, {
      where: { id: id },
    });
    return res[0];
  }

  // 根据id批量查询数据,给新增文章用的
  // async findTagByIds(tag_ids) {
  //   const res= await Tag.findAll({
  //     where: { id: { [Op.in]: tag_ids } },
  //   });
  //   return res;
  // }
}

module.exports = new TagService();
