const {
  createComment,
  getOneComment,
  getAllComment,
  getAllCommentByPage,
  deleteManyComment,
  deleteOneComment,
  updateComment,
} = require('../service/comment.service');

const {
  commentAddError,
  commentGetError,
  commentDelError,
  commentUpdateError,
  invalidCommentID,
} = require('../constant/err.type');

class CommentController {
  // 新增评论
  async add(ctx, next) {
    const { article_id, content, parent_comment_id, comment_equipment } = ctx.request.body;
    const user_id = ctx.state.user.id;
    console.log('==================', user_id);
    try {
      const res = await createComment({ user_id, article_id, content, parent_comment_id, comment_equipment });
      ctx.body = {
        code: 0,
        message: '添加评论成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', commentAddError, ctx);
    }
  }

  // 根据id获取评论
  async getOne(ctx, next) {
    const { id } = ctx.params;
    try {
      const res = await getOneComment(id);
      ctx.body = {
        code: 0,
        message: '获取评论成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', commentGetError, ctx);
    }
  }

  // 获取评论列表
  async getAll(ctx, next) {
    try {
      const res = await getAllComment();
      ctx.body = {
        code: 0,
        message: '获取评论列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', commentGetError, ctx);
    }
  }

  // 分页获取评论列表
  async getAllByPage(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    console.log(ctx.request.query);
    try {
      const res = await getAllCommentByPage(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: '获取评论列表成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', commentGetError, ctx);
    }
  }

  // 批量删除评论  array [1,2,3]
  async deleteMany(ctx, next) {
    const { ids } = ctx.request.body;
    try {
      // res是删除的条数
      const res = await deleteManyComment(ids);
      ctx.body = {
        code: 0,
        message: '批量删除评论成功',
        data: res,
      };
    } catch (err) {
      return ctx.app.emit('error', commentDelError, ctx);
    }
  }

  // 根据id删除评论
  async deleteOne(ctx, next) {
    const { id } = ctx.params;
    try {
      const res = await deleteOneComment(id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '删除评论成功',
          data: '',
        };
      } else {
        return ctx.app.emit('error', invalidCommentID, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', commentDelError, ctx);
    }
  }

  // 根据id修改评论
  async updateOne(ctx, next) {
    try {
      const res = await updateComment(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改评论成功',
          data: '',
        };
      } else {
        return ctx.app.emit('error', invalidCommentID, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', commentUpdateError, ctx);
    }
  }
}

module.exports = new CommentController();
