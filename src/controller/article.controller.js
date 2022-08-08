const {
  createArticle,
  createArticleTag,
  delArticleByID,
  getAllArticle,
  getAllArticleByCategor,
  getAllArticleByPage,
  getArticleByID,
  getAllArticleByTag,
  getAllArticleByKeyword,
  delArticleByIDs,
  updateArticleByID,
  increaseViewsById,
  increaseLikesById,
} = require('../service/article.service');
const {
  articleAddError,
  articleGetError,
  articleNotFoundError,
  articleDelError,
  articleUpdateError,
  articleTitleExistedError,
} = require('../constant/err.type');
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

  /**分页获取文章 */
  async getAllByPage(ctx) {
    const { pageNum = 1, pageSize = 10, status, origin, weight, keyword } = ctx.request.query;
    // console.log(ctx.request.query, '&&&&&&&&&&&&&&&&&&&&&&',status, origin, weight, keyword);
    try {
      const res = await getAllArticleByPage(pageNum, pageSize, status, origin, weight, keyword);
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }

  /**根据文章id获取文章详情 */
  async getByID(ctx) {
    const { id } = ctx.params;
    try {
      const res = await getArticleByID(id);
      if (!res) {
        return ctx.app.emit('error', articleNotFoundError, ctx);
      }
      ctx.body = {
        code: 0,
        message: '获取文章详情成功',
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

  /**根据标签id获取文章列表 */
  async getAllByTag(ctx) {
    const { id } = ctx.params;
    try {
      const res = await getAllArticleByTag(id);
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }

  /**根据关键字搜索文章列表 */
  async getAllByKeyword(ctx) {
    const { keyword, pageNum = 1, pageSize = 10 } = ctx.request.body;
    try {
      const res = await getAllArticleByKeyword(keyword, pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }

  /**根据文章id删除文章 */
  async deleteOneByID(ctx) {
    const { id } = ctx.params;
    try {
      const res = await delArticleByID(id);
      if (!res) {
        return ctx.app.emit('error', articleNotFoundError, ctx);
      }
      ctx.body = {
        code: 0,
        message: '删除文章成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleDelError, ctx);
    }
  }

  /**根据ids数组批量删除文章 */
  async deleteManyByIDs(ctx) {
    const { ids } = ctx.request.body;
    console.log('===============', ids);
    try {
      const res = await delArticleByIDs(ids);
      if (!res) {
        return ctx.app.emit('error', articleNotFoundError, ctx);
      }
      ctx.body = {
        code: 0,
        message: '删除文章成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', articleDelError, ctx);
    }
  }

  /** 更新文章 */
  async updateOneByID(ctx) {
    const { id } = ctx.params;
    try {
      const res = await updateArticleByID(id, ctx.request.body);
      if (!res) {
        return ctx.app.emit('error', articleTitleExistedError, ctx);
      }
      if (!res[0]) {
        return ctx.app.emit('error', articleNotFoundError, ctx);
      }
      ctx.body = {
        code: 0,
        message: '更新文章成功',
        data: res[0],
      };
    } catch (err) {
      return ctx.app.emit('error', articleUpdateError, ctx);
    }
  }

  /**文章访问量+1 */
  async increaseViews(ctx) {
    const { id } = ctx.params;
    try {
      await increaseViewsById(id);
      ctx.body = {
        code: 0,
        message: '文章访问量+1成功',
        data: '',
      };
    } catch (err) {
      return ctx.app.emit('error', articleUpdateError, ctx);
    }
  }

  /** 文章喜欢+1 */
  async increaseLikes(ctx) {
    const { id } = ctx.params;
    try {
      await increaseLikesById(id);
      ctx.body = {
        code: 0,
        message: '文章喜欢+1成功',
        data: '',
      };
    } catch (err) {
      return ctx.app.emit('error', articleUpdateError, ctx);
    }
  }
}
module.exports = new ArticleController();
