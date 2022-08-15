const moment = require('moment');
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
  getArticleByArticleID,
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
const { APP_PORT } = require('../config/config.default');

class ArticleController {
  /** 新增文章 */
  async add(ctx) {
    console.log('##########', ctx.request.body);
    const user_id = ctx.state.user.id;
    const { tags = [] } = ctx.request.body;
    const { title, subtitle, content, cover, status, category, origin, weight } = ctx.request.body;
    let articleID = null;
    try {
      const res = await createArticle({
        subtitle,
        category_id: category,
        user_id,
        title,
        content,
        cover,
        status,
        weight,
        origin,
      });
      articleID = res.dataValues.id;
      await createArticleTag({ article_id: articleID, tag_ids: tags });
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
    let datefrom = null;
    let dateto = null;
    if (ctx.request.query['createdAt[]']) {
      const timeFrom = ctx.request.query['createdAt[]'][0];
      const timeTo = ctx.request.query['createdAt[]'][1];
      datefrom = new Date(timeFrom.slice(1, timeFrom.length - 1));
      dateto = new Date(timeTo.slice(1, timeFrom.length - 1));
      // 日期需要加一天
      dateto = dateto.setDate(dateto.getDate() + 1);
      // datefrom = datefrom.setDate(datefrom.getDate() - 1);

      // console.log(moment(dateto).format('YYYY-MM-DD'));
      // console.log(moment(datefrom).format('YYYY-MM-DD'));
    } else {
      // TODO
      dateto = new Date();
      // // datefrom设置为2年前
      datefrom = moment(dateto).subtract(2, 'year').toDate();
    }

    // console.log('############', new Date());
    // console.log('############', new Date(timeFrom.slice(1, timeFrom.length - 1)));
    // console.log('############', new Date(timeTo.slice(1, timeFrom.length - 1)));

    try {
      const res = await getAllArticleByPage(pageNum, pageSize, status, origin, weight, keyword, datefrom, dateto);
      ctx.body = {
        code: 0,
        message: '获取文章列表成功',
        data: res,
      };
    } catch (err) {
      console.log('err', err);
      return ctx.app.emit('error', articleGetError, ctx);
    }
  }

  /**根据文章id获取文章详情 */
  async getByID(ctx) {
    const { id } = ctx.params;
    console.log(id);
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

  /**根据article_id获取文章详情*/
  async getByArticleID(ctx) {
    const { article_id } = ctx.params;
    console.log('######', article_id);
    try {
      const res = await getArticleByArticleID(article_id);
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
    const { tags } = ctx.request.body;
    const { category } = ctx.request.body;
    ctx.request.body.category_id = category;
    try {
      const res = await updateArticleByID(id, ctx.request.body);
      if (!res) {
        return ctx.app.emit('error', articleTitleExistedError, ctx);
      }
      if (!res[0]) {
        return ctx.app.emit('error', articleNotFoundError, ctx);
      }
      // 更新文章标签表
      await createArticleTag({ article_id: id, tag_ids: tags });
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

  /**上传文章背景图片 */
  async uploadCover(ctx) {
    const { avatar_Img } = ctx.request.files || {};

    const fileTypes = ['image/jpeg', 'image/png'];
    if (avatar_Img) {
      if (!fileTypes.includes(avatar_Img.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      // 文件名 *.jpg
      const filename = avatar_Img.newFilename;
      ctx.body = {
        code: 0,
        message: '文章图片上传成功',
        data: {
          avatar_Img: filename,
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  /**上传文章内容图片 */
  async uploadImgs(ctx) {
    const { uploadImg } = ctx.request.files || {};
    const fileTypes = ['image/jpeg', 'image/png'];
    if (uploadImg) {
      if (!fileTypes.includes(uploadImg.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      // 文件名 *.jpg
      const filename = uploadImg.newFilename;
      ctx.body = {
        code: 0,
        message: '',
        data: {
          Url: `http://localhost:${APP_PORT}/${filename}`,
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }
}
module.exports = new ArticleController();
