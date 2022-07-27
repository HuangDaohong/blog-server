const Tag = require('../model/tag.model');
class TagService {

  // 插入数据
  async createTag (name, description) {
    console.log('tag@@@@', name, description);

    return await Tag.create(name, description);
  }

  // 查询所有数据
  async finAllTags () {
    return await Tag.findAndCountAll();
  }

  // 删除数据
  async removeTag (id) {
    const res = await Tag.destroy({
      where: { id }
    });
    return res > 0 ? true : false;
  }

  // 修改数据
  async updateTag (tag) {
    const res = await Tag.update(tag, {
      where: { id: tag.id }
    });
    return res[0];
  }
}

module.exports = new TagService();
