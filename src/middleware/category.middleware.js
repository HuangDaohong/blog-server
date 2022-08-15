const { Op } = require('sequelize');
const Category = require('../model/category.model');
const { categoryIsExistedError } = require('../constant/err.type');

const verifyIsExisted = async (ctx, next) => {
  // 存在id的话说明是修改，不存在id的话说明是添加
  const { name, id } = ctx.request.body;
  if (id) {
    const category = await Category.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (category) {
      return ctx.app.emit('error', categoryIsExistedError, ctx);
    }
    return await next();
  }
  // 分类名是否已经存在

  const category = await Category.findOne({ where: { name } });
  if (category) {
    return ctx.app.emit('error', categoryIsExistedError, ctx);
  }
  return await next();
};
module.exports = {
  verifyIsExisted,
};
