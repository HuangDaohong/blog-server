const { createTag, finAllTags, removeTag, updateTag } = require('../service/tag.service');
const { tagAddError, tagGeterror, tagDelerror, tagUpdateError, invalidTagID } = require('../constant/err.type');

class TagController {
  // 添加标签
  async add(ctx, next) {
    const { name, description, color, background } = ctx.request.body;
    try {
      const res = await createTag({ name, description, color, background });
      ctx.body = {
        code: 0,
        message: '添加标签成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', tagAddError, ctx);
    }
  }

  // 获取标签列表
  async finAll(ctx, next) {
    try {
      const res = await finAllTags();
      res?.rows.forEach(item => {
        // 增加文章数目属性
        item.dataValues.articleCount = item.dataValues.tb_articles.length;
      } );
      ctx.body = {
        code: 0,
        message: '获取标签列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', tagGeterror, ctx);
    }
  }

  // 删除标签
  async deleteTag(ctx, next) {
    const res = await removeTag(ctx.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除标签成功',
        data: '',
      };
    } else {
      return ctx.app.emit('error', tagDelerror, ctx);
    }
  }

  // 修改标签
  async updateTag(ctx, next) {
    const {id}=ctx.request.params
    try {
      const res = await updateTag(id,ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改标签成功',
          data: res,
        };
      } else {
        return ctx.app.emit('error', invalidTagID, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', tagUpdateError, ctx);
    }
  }
}

module.exports = new TagController();
