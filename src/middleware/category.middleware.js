const Category = require('../model/category.model');
const { categoryIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 分类名是否已经存在
  const { name } = ctx.request.body;
  const category = await Category.findOne({ where: { name } });
  if (category) {
    return ctx.app.emit('error', categoryIsExistedError, ctx);
  }
  return await next();
};
module.exports = {
  verifyIsExisted,
};