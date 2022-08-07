const {
  createArticle,
  createArticleTag,
  delArticleByID,
  getAllArticle,
  getAllArticleByCategor,
} = require('../service/article.service');
const { articleAddError, articleGetError } = require('../constant/err.type');
// const { createUUID } = require('../config/utils');

class ArticleController {
  /** 新增文章 */
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const { tag_ids = [] } = ctx.request.body;
    const { title, subtitle, content, cover, status, category_id } = ctx.request.body;
    let articleID = null;
    try {
      const res = await createArticle({ user_id, title, subtitle, content, cover, status, category_id });
      articleID = res.dataValues.id;
      await createArticleTag({ article_id: articleID, tag_ids });
      ctx.body = {
        code: 0,
        message: '添加文章成功',
        data: res,
      };
    } catch (err) {
      // 删除文章
      console.log('删除了文章');
      await delArticleByID(articleID);
      return ctx.app.emit('error', articleAddError, ctx);
    }
  }

  /**一次获取全部文章 */
  async getAll(ctx) {
    try {
      const res = await getAllArticle();
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }

  /**根据分类获取文章列表 */
  async getAllByCategory(ctx) {
    const { id } = ctx.params;
    try {
      const res = await getAllArticleByCategor(id);
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }
}
module.exports = new ArticleController();
