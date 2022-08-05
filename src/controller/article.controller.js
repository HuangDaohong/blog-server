const {
  createArticle,
  createArticleTag,
  createArticleCategory,
  delArticleByID,
} = require('../service/article.service');
const { findCategoryById } = require('../service/category.service');
// const { findTagByIds } = require('../service/tag.service');
const { articleAddError, invalidCategoryID } = require('../constant/err.type');

class ArticleController {
  // 新增文章
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const { category_id } = ctx.request.body;
    const { tag_ids } = ctx.request.body;
    const { title, subtitle, content, cover, status } = ctx.request.body;
    let articleID = null;
    try {
      const res = await createArticle({ user_id, title, subtitle, content, cover, status });

      articleID = res.dataValues.id;
      if (await findCategoryById(category_id)) {
        await createArticleCategory({ article_id: articleID, category_id: category_id });
      } else {
        // 分类不存在
        await delArticleByID(articleID);
        return ctx.app.emit('error', invalidCategoryID, ctx);
      }

      // 这里有点问题，眼睛疼，不考虑这样的情况了
      // const restag = await findTagByIds(tag_ids);
      // console.log('restag', restag.length);
      // console.log('tag_ids', tag_ids.length);
      // if (restag.length === tag_ids.length) {
      //   await createArticleTag({ article_id: articleID, tag_ids });
      // } else {
      //   await delArticleByID(articleID);
      //   return ctx.app.emit('error', invalidTagID, ctx);
      // }

      await createArticleTag({ article_id: articleID, tag_ids });

      ctx.body = {
        code: 0,
        message: '添加文章成功',
        data: res,
      };
    } catch (err) {
      // 删除文章
      await delArticleByID(articleID);
      return ctx.app.emit('error', articleAddError, ctx);
    }
  }
}
module.exports = new ArticleController();
