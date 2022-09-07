const {
  createCategory,
  finAllCategorys,
  removeCategory,
  updateCategory,
  findOneById,
  finAllCategorysByPage,
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
  async add(ctx) {
    const { name, description, background } = ctx.request.body;
    try {
      const res = await createCategory({ name, description, background });
      ctx.body = {
        code: 0,
        message: '添加分类成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', categoryAddError, ctx, err);
    }
  }

  // 根据id获取分类
  async findOne(ctx) {
    const { id } = ctx.params;
    try {
      const res = await findOneById(id);
      if (!res) {
        return ctx.app.emit('error', invalidCategoryID, ctx, err);
      }
      ctx.body = {
        code: 0,
        message: '获取分类成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', categoryGeterror, ctx, err);
    }
  }

  // 获取分类列表
  async finAll(ctx) {
    try {
      const res = await finAllCategorys();
      ctx.body = {
        code: 0,
        message: '获取分类列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', categoryGeterror, ctx, err);
    }
  }

  // 分页获取分类列表
  async finAllByPage(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await finAllCategorysByPage(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: '获取分类列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', categoryGeterror, ctx, err);
    }
  }

  // 删除分类
  async deleteCategory(ctx) {
    console.log('@@@', ctx.request.body.id);
    try {
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
    } catch (err) {
      return ctx.app.emit('error', categoryDelerror, ctx, err);
    }
  }

  // 修改分类
  async updateCategory(ctx) {
    try {
      const res = await updateCategory(ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改分类成功',
          data: res,
        };
      } else {
        return ctx.app.emit('error', invalidCategoryID, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', categoryUpdateError, ctx, err);
    }
  }
}

module.exports = new CategoryController();
