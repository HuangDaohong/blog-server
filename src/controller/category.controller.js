const {
  createCategory,
  finAllCategorys,
  removeCategory,
  updateCategory,
} = require('../service/category.service');
const {
  categoryAddError,
  categoryGeterror,
  categoryDelerror,
  categoryUpdateError,
  invalidCategoryID,
} = require('../constant/err.type');


class CategoryController {

  // 添加分类
  async add (ctx, next) {
    const { name, description,background } = ctx.request.body;
    try {
      const res = await createCategory({ name, description,background });
      ctx.body = {
        code: 0,
        message: '添加分类成功',
        data: res
      };
    } catch (err) {
      return ctx.app.emit('error', categoryAddError, ctx);
    }
  }

  // 获取分类列表
  async finAll (ctx, next) {
    try {
      const res = await finAllCategorys();
      ctx.body = {
        code: 0,
        message: '获取分类列表成功',
        data: res
      };
    }
    catch (err) {
      return ctx.app.emit('error', categoryGeterror, ctx);
    }
  }

  // 删除分类
  async deleteCategory (ctx, next) {
    const res = await removeCategory(ctx.request.body.id);
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除分类成功',
        data: '',
      };
    } else {
      return ctx.app.emit('error', categoryDelerror, ctx);
    }
  }

  // 修改分类
  async updateCategory (ctx, next) {
    try {
      const res = await updateCategory(ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改分类成功',
          data: res
        };
      } else {
        return ctx.app.emit('error', invalidCategoryID, ctx);
      }

    } catch (err) {
      return ctx.app.emit('error', categoryUpdateError, ctx);
    }
  }

}

module.exports = new CategoryController();