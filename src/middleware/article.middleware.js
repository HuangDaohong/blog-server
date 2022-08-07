const Article = require('../model/article.model');
const { articleIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 文章名是否已经存在
  const { title } = ctx.request.body;
  const article = await Article.findOne({ where: { title } });
  if (article) {
    return ctx.app.emit('error', articleIsExistedError, ctx);
  }
  return await next();
};
module.exports = {
  verifyIsExisted,
};
