const Tag = require('../model/tag.model');
const { tagIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 标签名是否已经存在
  const { name } = ctx.request.body;
  const tag = await Tag.findOne({ where: { name } });
  if (tag) {
    return ctx.app.emit('error', tagIsExistedError, ctx);
  }
  return await next();
};
module.exports = {
  verifyIsExisted,
};