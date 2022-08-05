const Tag = require('../model/tag.model');
const { Op } = require('sequelize');
class TagService {
  // 插入数据
  async createTag(name, description, color, background) {
    console.log('tag@@@@', name, description, color, background);
    return await Tag.create(name, description, color, background);
  }

  // 查询所有数据
  async finAllTags() {
    return await Tag.findAndCountAll();
  }

  // 删除数据
  async removeTag(id) {
    const res = await Tag.destroy({
      where: { id },
    });
    return res > 0 ? true : false;
  }

  // 修改数据
  async updateTag(tag) {
    const res = await Tag.update(tag, {
      where: { id: tag.id },
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
