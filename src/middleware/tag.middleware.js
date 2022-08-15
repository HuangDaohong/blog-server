const { Op } = require('sequelize');
const Tag = require('../model/tag.model');
const { tagIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 存在id的话说明是修改，不存在id的话说明是添加
  const { id } = ctx.request.params;
  const { name } = ctx.request.body;
  if (id) {
    const tag = await Tag.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (tag) {
      return ctx.app.emit('error', tagIsExistedError, ctx);
    }
    return await next();
  }
  // 标签名是否已经存在
  const tag = await Tag.findOne({ where: { name } });
  if (tag) {
    return ctx.app.emit('error', tagIsExistedError, ctx);
  }
  return await next();
};
module.exports = {
  verifyIsExisted,
};
